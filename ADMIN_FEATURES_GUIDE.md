# VICON Admin Dashboard - Features Guide

Quick reference guide for using the admin dashboard features.

---

## 🏠 Dashboard Home
**URL:** `/admin`

### Features:
- Overview statistics (total users, active users, sales people, influencers)
- Quick action cards for common tasks
- Navigation to Users, Analytics, and Add New User

### Quick Actions:
- **Manage Users** → Go to users list
- **View Analytics** → See detailed analytics
- **Add New User** → Create a new user

---

## 👥 User Management
**URL:** `/admin/users`

### Features:
1. **View All Users**
   - See list of all sales people and influencers
   - View name, email, type, phone, status, and creation date

2. **Search & Filter**
   - Search by name or email (real-time)
   - Filter by user type (Sales Person / Influencer)
   - Filter by status (Active / Inactive)
   - Clear all filters with one click

3. **Bulk Operations**
   - Select multiple users with checkboxes
   - Select/deselect all users
   - Bulk activate selected users
   - Bulk deactivate selected users
   - Export selected users to CSV
   - Export all users to CSV

4. **Individual Actions**
   - **View** → See detailed user profile
   - **Edit** → Modify user information

### How to Use Filters:
```
1. Type in search box to find users by name/email
2. Select user type from dropdown (or leave as "All Types")
3. Select status from dropdown (or leave as "All Statuses")
4. Results update automatically
5. Click "Clear All" to reset filters
```

### How to Use Bulk Operations:
```
1. Check boxes next to users you want to select
2. Or click checkbox in header to select all
3. Bulk actions bar appears showing count
4. Click "Activate" or "Deactivate" to change status
5. Click "Export Selected" to download CSV
```

### CSV Export Format:
- Name
- Email
- Type (Sales Person / Influencer)
- Phone
- Status (Active / Inactive)
- Created Date

---

## 👤 User Details
**URL:** `/admin/users/[id]/details`

### Features:
- Complete user profile view
- Basic information (name, email, phone, user ID)
- Sales-specific info (commission rate)
- Influencer-specific info (social media handles)
- Notes
- Account metadata (created, last updated)
- Quick link to edit user

### Information Displayed:

**For All Users:**
- Full name
- Email address
- Phone number
- User ID
- Account status (Active/Inactive)
- User type (Sales Person/Influencer)
- Created date
- Last updated date
- Notes (if any)

**For Sales People:**
- Commission rate percentage

**For Influencers:**
- Social media handles (Instagram, YouTube, TikTok, etc.)

---

## ➕ Add New User
**URL:** `/admin/users/new`

### Required Fields:
- Full Name
- Email
- Password (minimum 8 characters)
- User Type (Sales Person or Influencer)

### Optional Fields:
- Phone
- Commission Rate (for sales people)
- Social Media (JSON format for influencers)
- Notes

### Example Social Media JSON:
```json
{
  "instagram": "@username",
  "youtube": "channel_name",
  "tiktok": "@username"
}
```

---

## ✏️ Edit User
**URL:** `/admin/users/[id]`

### Features:
- Edit all user information
- Toggle active/inactive status
- Delete user (with confirmation)
- Cannot edit admin users

### Fields You Can Edit:
- Name
- Email
- User type
- Phone
- Commission rate
- Social media
- Notes
- Active status

**Note:** Password cannot be changed through edit form (security feature)

---

## 📊 Analytics Dashboard
**URL:** `/admin/analytics`

### Overview Statistics:
1. **Total Users**
   - Total count
   - Active vs inactive breakdown

2. **Sales People**
   - Total sales people
   - Active count

3. **Influencers**
   - Total influencers
   - Active count

4. **Average Commission**
   - Average commission rate for sales people

### Distribution Charts:

**User Type Distribution:**
- Visual breakdown of sales people vs influencers
- Percentage and count for each type

**User Status:**
- Active vs inactive users
- Color-coded progress bars (green = active, red = inactive)

### Growth Metrics:

**Last 30 Days:**
- Total new users added
- New sales people count
- New influencers count

---

## 🔐 Security Features

### Access Control:
- Only users with ADMIN role can access admin pages
- Automatic redirect to login if not authenticated
- Session-based authentication

### Protected Operations:
- Cannot edit admin users
- Cannot delete admin users
- Cannot perform bulk operations on admin users
- All API endpoints require authentication

---

## 💡 Tips & Best Practices

### User Management:
1. Use filters to quickly find specific users
2. Export to CSV for backup or reporting
3. Use bulk operations to manage multiple users efficiently
4. Check user details before editing

### Analytics:
1. Check analytics regularly to monitor growth
2. Track active vs inactive users
3. Monitor commission rates for sales team

### Data Entry:
1. Always fill in phone numbers for better contact management
2. Add notes for important user information
3. Set appropriate commission rates for sales people
4. Keep social media information updated for influencers

---

## 🆘 Common Tasks

### How to find a specific user:
1. Go to Users page
2. Type name or email in search box
3. Results filter automatically

### How to activate multiple users:
1. Go to Users page
2. Select users with checkboxes
3. Click "Activate" button
4. Confirm action

### How to export user data:
1. Go to Users page
2. (Optional) Filter or select specific users
3. Click "Export Selected" or "Export All to CSV"
4. File downloads automatically

### How to view user statistics:
1. Click "Analytics" from any admin page
2. View overview cards at top
3. Scroll down for detailed breakdowns

---

## 📱 Mobile Usage

All admin pages are responsive and work on mobile devices:
- Touch-friendly buttons and controls
- Responsive tables (scroll horizontally if needed)
- Optimized layouts for smaller screens
- All features available on mobile

---

## 🔄 Navigation

### Main Navigation (Available on all pages):
- **Dashboard** → Home page with overview
- **Users** → User management
- **Analytics** → Analytics dashboard

### Quick Links:
- Sign out button always visible
- Welcome message shows current admin name
- Back buttons on detail pages

---

**Need Help?** Check the [PHASE_4_COMPLETE.md](./PHASE_4_COMPLETE.md) for technical details or [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for setup information.

