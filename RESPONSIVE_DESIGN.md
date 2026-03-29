# Responsive Design - LMS Application

## 📱 Overview
Aplikasi LMS telah dioptimasi untuk tampil sempurna di berbagai ukuran layar, dari smartphone hingga desktop besar.

## 🎨 Breakpoints
Aplikasi menggunakan breakpoint standar Tailwind CSS:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 768px (md)
- **Desktop**: 768px - 1024px (lg)
- **Desktop Large**: > 1024px (xl)

## 🔧 Komponen yang Telah Dioptimasi

### 1. **LoginPage (Lobby)**
#### Mobile (< 640px):
- Width container: 95%
- Padding: 24px
- Font size title: 16px
- Role buttons: 150px × 120px (grid 2×2)
- Icon size: 48px
- Form inputs: padding 2×3

#### Tablet (640px+):
- Width container: 85%
- Padding: 32px
- Role buttons: 180px × 140px

#### Desktop (768px+):
- Width container: 90% (max 568px)
- Padding: 48px
- Font size title: 20px
- Role buttons: 223px × 169px (grid 2×2 original)
- Icon size: 64px
- Form inputs: padding 3×4

### 2. **DashboardLayout**
#### Sidebar:
- **Mobile**: Fixed sidebar dengan overlay, slide-in dari kiri
- **Desktop**: Sticky sidebar, toggle collapse/expand

#### Header:
- **Mobile**: 64px tinggi, hamburger menu
- **Desktop**: 112px tinggi, tanpa hamburger

#### Content Padding:
- **Mobile**: 12px (p-3)
- **Tablet**: 24px (p-6)
- **Desktop**: 32px (p-8)

### 3. **Dashboard Components**

#### StatCard:
- **Mobile**: 
  - Padding: 16px (p-4)
  - Icon: 20px
  - Text value: text-2xl
  - Grid: 1 column
  
- **Tablet**:
  - Grid: 2 columns

- **Desktop**:
  - Padding: 24px (p-6)
  - Icon: 24px
  - Text value: text-3xl
  - Grid: 4 columns

#### QuickAction Cards:
- **Mobile**: Full width, 1 column
- **Tablet**: 2 columns
- **Desktop**: 4 columns

### 4. **UI Components (Reusable)**

#### Card Component:
```tsx
<Card>
  <CardHeader title="..." subtitle="..." action={...} />
  <CardContent>...</CardContent>
</Card>
```
- Auto-responsive padding
- Responsive text sizes

#### Button Component:
```tsx
<Button size="sm|md|lg" variant="primary|secondary|danger">
```
- Responsive icon sizes
- Responsive padding

#### Table Component:
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>...</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>...</TableCell>
    </TableRow>
  </TableBody>
</Table>
```
- Horizontal scroll pada mobile
- Responsive cell padding

## 📐 Design Guidelines

### Typography Scale:
| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 | text-lg (18px) | text-xl (20px) | text-2xl (24px) |
| H2 | text-base (16px) | text-lg (18px) | text-xl (20px) |
| H3 | text-sm (14px) | text-base (16px) | text-lg (18px) |
| Body | text-xs (12px) | text-sm (14px) | text-base (16px) |
| Caption | text-[10px] | text-xs (12px) | text-sm (14px) |

### Spacing Scale:
| Type | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| Card Padding | p-4 (16px) | p-5 (20px) | p-6 (24px) |
| Section Gap | gap-4 (16px) | gap-5 (20px) | gap-6 (24px) |
| Grid Gap | gap-3 (12px) | gap-4 (16px) | gap-6 (24px) |

### Icon Sizes:
| Context | Mobile | Desktop |
|---------|--------|---------|
| Small | 14px-16px | 16px-18px |
| Medium | 18px-20px | 20px-24px |
| Large | 24px | 28px-32px |

## ✅ Best Practices

### 1. **Always Use Responsive Classes**
```tsx
// ✅ Good
<div className="text-sm md:text-base lg:text-lg">

// ❌ Bad
<div className="text-base">
```

### 2. **Mobile-First Approach**
```tsx
// ✅ Good - Start from mobile, add larger breakpoints
<div className="w-full md:w-1/2 lg:w-1/3">

// ❌ Bad - Desktop-first
<div className="w-1/3 md:w-1/2 sm:w-full">
```

### 3. **Test on Multiple Devices**
- iPhone SE (375px)
- iPhone 12/13 (390px)
- iPad (768px)
- Desktop (1440px+)

### 4. **Use Responsive Grid**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
```

### 5. **Hide/Show Elements Based on Screen**
```tsx
// Hide on mobile
<div className="hidden md:block">

// Show only on mobile
<div className="block md:hidden">
```

## 🎯 Testing Checklist

- [ ] Login page tampil baik di mobile
- [ ] Sidebar berfungsi di mobile (slide-in)
- [ ] Dashboard cards responsive (1→2→4 columns)
- [ ] Tables scroll horizontal di mobile
- [ ] Buttons ukuran sesuai di mobile
- [ ] Forms tidak overflow di mobile
- [ ] Images responsive
- [ ] Navigation accessible di mobile
- [ ] Touch targets minimal 44x44px
- [ ] Text readable di semua ukuran

## 📱 Mobile-Specific Features

1. **Touch-Friendly**
   - Minimum button size: 44x44px
   - Adequate spacing between clickable elements
   - No hover-only interactions

2. **Performance**
   - Lazy loading images
   - Optimized bundle size
   - Minimal re-renders

3. **Accessibility**
   - Proper heading hierarchy
   - ARIA labels where needed
   - Keyboard navigation support

## 🚀 Future Improvements

- [ ] Add swipe gestures untuk navigation
- [ ] Implement pull-to-refresh
- [ ] Add bottom navigation untuk mobile
- [ ] Optimize images dengan responsive images
- [ ] Add skeleton loaders
- [ ] Implement virtual scrolling untuk long lists
