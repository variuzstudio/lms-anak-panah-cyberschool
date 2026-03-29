import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { mockStudents, mockTeachers, mockParents } from '../data/mockData';

export type UserRole = 'admin' | 'guru' | 'murid' | 'orangtua';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
  email: string;
  avatar?: string;
  // Tambahan data untuk security
  studentId?: string; // Jika role = murid
  teacherId?: string; // Jika role = guru
  parentId?: string; // Jika role = orangtua
  childrenIds?: string[]; // Jika role = orangtua, array ID anak
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string, targetId?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users untuk demo dengan mapping ke data sekolah
const MOCK_USERS: Record<string, User & { password: string }> = {
  admin: {
    id: 'ADM001',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Administrator',
    email: 'admin@school.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  guru: {
    id: 'T001',
    username: 'guru',
    password: 'guru123',
    role: 'guru',
    name: 'Budi Santoso, S.Pd',
    email: 'budi.santoso@school.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
    teacherId: 'T001'
  },
  murid: {
    id: 'S001',
    username: 'murid',
    password: 'murid123',
    role: 'murid',
    name: 'Ani Wijaya',
    email: 'ani.wijaya@student.school.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ani',
    studentId: 'S001'
  },
  orangtua: {
    id: 'P001',
    username: 'orangtua',
    password: 'orangtua123',
    role: 'orangtua',
    name: 'Siti Rahayu',
    email: 'siti.rahayu@parent.school.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=parent1',
    parentId: 'P001',
    childrenIds: ['S001']
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('lms_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('lms_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock login - check against MOCK_USERS
    const mockUser = MOCK_USERS[username.toLowerCase()];
    
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('lms_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
  };

  // Permission system untuk privacy control
  const hasPermission = (permission: string, targetId?: string): boolean => {
    if (!user) return false;

    // Admin has all permissions
    if (user.role === 'admin') return true;

    switch (permission) {
      case 'view_all_students':
        return user.role === 'admin' || user.role === 'guru';
      
      case 'view_student_data':
        if (user.role === 'admin' || user.role === 'guru') return true;
        if (user.role === 'murid' && targetId === user.studentId) return true;
        if (user.role === 'orangtua' && user.childrenIds?.includes(targetId || '')) return true;
        return false;
      
      case 'edit_student_data':
        return user.role === 'admin';
      
      case 'view_grades':
        if (user.role === 'admin' || user.role === 'guru') return true;
        if (user.role === 'murid' && targetId === user.studentId) return true;
        if (user.role === 'orangtua' && user.childrenIds?.includes(targetId || '')) return true;
        return false;
      
      case 'edit_grades':
        return user.role === 'guru' || user.role === 'admin';
      
      case 'view_payments':
        if (user.role === 'admin') return true;
        if (user.role === 'murid' && targetId === user.studentId) return true;
        if (user.role === 'orangtua' && user.childrenIds?.includes(targetId || '')) return true;
        return false;
      
      case 'manage_teachers':
      case 'manage_classes':
      case 'manage_subjects':
        return user.role === 'admin';
      
      case 'create_assignment':
      case 'create_exam':
      case 'grade_assignment':
      case 'grade_exam':
      case 'mark_attendance':
        return user.role === 'guru' || user.role === 'admin';
      
      case 'view_forum':
        return true; // Semua role bisa lihat forum
      
      case 'create_forum_post':
        return true; // Semua role bisa buat post
      
      case 'delete_forum_post':
        if (user.role === 'admin') return true;
        // User bisa hapus post sendiri (implementasi lebih detail di komponen)
        return false;
      
      default:
        return false;
    }
  };

  // Don't render children until loading is complete
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}