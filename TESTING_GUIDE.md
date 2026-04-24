# StaffTask - Testing Guide

## New Features Added

This update adds **role-based behavior** to the StaffTask app. The system now supports two roles: **Admin** and **Staff**.

---

## Quick Start

### 1. Open the App
Open `index.html` in your web browser.

### 2. Switch Roles
Look at the top header. You'll see:
- **👤 Role Badge** showing current role (Admin/Staff)
- **Role Toggle Buttons** to switch between 👨‍💼 Admin and 👨‍🔧 Staff

Click the buttons to switch roles.

---

## Admin Mode

### What Admins Can Do:
1. ✅ Click "**➕ New Task**" button to create tasks
2. ✅ Edit existing tasks by clicking them
3. ✅ Delete tasks from the edit modal
4. ✅ Drag tasks between columns (To Do → In Progress → Complete → Blocked)
5. ✅ Filter tasks by search, priority, status, and assignee
6. ✅ View task counters in the header

### Admin Task Creation:
1. Click "**➕ New Task**"
2. Fill in:
   - Task Title (required)
   - Description (optional)
   - Assigned Staff (name)
   - Priority (High/Medium/Low)
   - Due Date (optional)
3. Click "**📍 Capture My Location**" to add a location to the task
4. Click "**Save Task**"

---

## Staff Mode

### What Staff Can Do:
1. ✅ View assigned tasks (all tasks in staff mode)
2. ✅ Click a task to see details
3. ✅ Click "**🚀 Start Task**" to begin work
4. ✅ Upload **📷 Image** and **🎥 Video** as proof of work
5. ✅ Click "**✅ Complete Task**" to finish (requires proof upload)

### What Staff CANNOT Do:
1. ❌ Create new tasks
2. ❌ Edit task details
3. ❌ Drag tasks between columns
4. ❌ Delete tasks
5. ❌ See task filters and counters

---

## Staff Task Flow (Step by Step)

### Step 1: View Task
**In Admin Mode:**
1. Create a task and assign it to someone (e.g., "John Doe")
2. Set a due date and priority

**In Staff Mode:**
1. Click the task card to open it
2. You'll see the task title, description, priority, and due date

### Step 2: Start Task
1. Click "**🚀 Start Task**" button
2. Browser will ask for **location permission** (Allow it!)
3. The app will capture:
   - Your GPS coordinates (latitude/longitude)
   - Location name (city, town, village, county)
   - Started time
4. Task status changes to **"In Progress"** (visible in Kanban board)
5. Message shows: "✅ Task started successfully!"

### Step 3: Upload Proof
After starting the task:
1. Click "**📷 Upload Image**" to add photos
   - OR click "**🎥 Upload Video**" to add video clips
2. Select file from your device
3. File appears in the "Upload Proof of Work" section
4. You can upload multiple files
5. Click "**Remove**" to delete any file

**File Requirements:**
- Max 10MB per file
- Images: jpg, png, gif, webp
- Videos: mp4, webm, mov, etc.

### Step 4: Complete Task
1. After uploading at least one image or video:
2. Click "**✅ Complete Task**"
3. Task status changes to **"Complete"** (visible in Kanban board)
4. Confetti animation celebrates! 🎉
5. Message shows: "✅ Task completed successfully!"

---

## Test Scenarios

### Scenario 1: Complete Flow
```
1. Admin Mode → Create task "Fix Leak"
2. Assign to "John Doe"
3. Set priority "High", due date "tomorrow"
4. Switch to Staff Mode
5. Click task "Fix Leak"
6. Click "Start Task" (allow location)
7. Upload image "before.jpg"
8. Upload image "after.jpg"
9. Click "Complete Task"
10. See "Task completed successfully!" ✅
11. Task moves to "Complete" column
12. Confetti animation plays 🎉
```

### Scenario 2: Location Capture
```
1. Admin Mode → Create task "Site Inspection"
2. Click "Start Task" in task modal
3. Allow location access
4. See map embed with your location
5. Location address displays (e.g., "Downtown District")
```

### Scenario 3: File Upload Validation
```
1. Staff Mode → Open task
2. Click "Start Task"
3. Try to click "Complete Task" WITHOUT uploading files
4. See error: "❌ Please upload at least one image or video as proof before completing"
5. Upload an image
6. Now "Complete Task" button works
```

### Scenario 4: Multiple File Upload
```
1. Start a task
2. Upload image "photo1.jpg"
3. Upload image "photo2.jpg"
4. Upload video "progress.mp4"
5. See all three files listed with:
   - File icon/preview
   - File name
   - File size
   - Remove button
6. Click "Remove" on one file
7. File disappears from list
```

---

## Status Messages

You'll see status messages in the bottom left:

| Message | Type | Meaning |
|---------|------|---------|
| ✅ Task started successfully! | Success | Task is now In Progress |
| ✅ Image uploaded | Success | File added to proof |
| ✅ Task completed successfully! | Success | Task is complete |
| ❌ Please upload at least one... | Error | Need proof before completing |
| 📍 Location access denied | Error | Browser location permission denied |
| Switched to Admin/Staff mode | Info | Role changed |

---

## Data Storage

All data is saved in your browser's **localStorage**:
- **Tasks**: `stafftask_tasks` (JSON)
- **User Role**: `stafftask_role` ("admin" or "staff")

**To Reset Data:**
1. Open Browser Developer Tools (F12)
2. Go to "Application" or "Storage" tab
3. Find "Local Storage"
4. Delete `stafftask_tasks` and `stafftask_role`
5. Refresh the page

---

## Key Changes in Code

### New Files:
- None (single HTML file)

### New Functions:
1. `setRole(role)` - Switch between admin/staff
2. `loadRole()` - Load saved role on page load
3. `updateUIForRole()` - Show/hide UI based on role
4. `openStaffTaskModal(taskId)` - Staff task view (different from admin edit)
5. `staffStartTask()` - Capture location and start task
6. `handleStaffFileUpload(type)` - Upload image/video
7. `staffCompleteTask()` - Finish task with proof validation

### New CSS Classes:
- `.role-badge`, `.role-toggle` - Role selector UI
- `.upload-section`, `.uploaded-files` - File upload UI
- `.status-message`, `.task-timeline` - Status and progress display

### Modified Functions:
- `renderTaskCard()` - Shows different modals for admin/staff
- `getFilteredTasks()` - Staff only see tasks (no filtering UI)
- `setupDragAndDrop()` - Disabled for staff users
- `createTask()` - Includes new fields: startedAt, completedAt, startLocation, uploadedFiles

### New Task Fields:
```javascript
{
  // ... existing fields ...
  startedAt: null,        // When task was started (timestamp)
  completedAt: null,      // When task was completed (timestamp)
  startLocation: {        // Location when task started
    lat: number,
    lng: number,
    address: string
  },
  uploadedFiles: [        // Proof files uploaded by staff
    {
      id: string,
      type: "image|video",
      name: string,
      size: number,
      data: base64,       // File content stored as base64
      uploadedAt: number
    }
  ]
}
```

---

## Testing Checklist

### Admin Features:
- [ ] "New Task" button visible
- [ ] Can create new task
- [ ] Can edit existing task
- [ ] Can delete task
- [ ] Can drag tasks between columns
- [ ] Filters work (search, priority, status, assignee)
- [ ] Task counters update

### Staff Features:
- [ ] "New Task" button hidden
- [ ] Filters hidden
- [ ] Task counters hidden
- [ ] Can view task by clicking card
- [ ] Can start task and capture location
- [ ] Can upload image file
- [ ] Can upload video file
- [ ] Can see uploaded files list
- [ ] Can remove uploaded files
- [ ] Cannot complete without proof
- [ ] Can complete with proof
- [ ] Task moves to Complete column
- [ ] Confetti animation plays

### Cross-Cutting:
- [ ] Role switching works
- [ ] Role persists on refresh (localStorage)
- [ ] Status messages appear and disappear
- [ ] No console errors
- [ ] Mobile responsive (try on narrow browser)

---

## Troubleshooting

### "Location access denied" message
- Browser blocked geolocation permission
- Check browser URL bar for "Allow" button
- Or go to Settings → Site Permissions → Location

### Files not saving after completion
- Check browser's localStorage is enabled
- Try a different browser if issue persists

### "Cannot upload file" error
- File is over 10MB (too large)
- File format not supported (use jpg, png, mp4, webm, etc.)

### Role not persisting
- localStorage may be disabled
- Try an incognito/private window
- Check browser settings

---

## Future Enhancements

The app is ready for backend integration:

1. **User Authentication**: Replace role toggle with login
2. **Database**: Save tasks to backend instead of localStorage
3. **Real-time Updates**: WebSocket for live task updates
4. **Media Storage**: Upload files to cloud (S3, Cloudinary, etc.)
5. **Notifications**: Email/SMS when tasks assigned
6. **Mobile App**: React Native version
7. **Reporting**: Analytics and dashboards
8. **Teams**: Group tasks by location or team

---

## Code Structure

```
index.html
├── CSS
│   ├── Theme variables (colors, fonts)
│   ├── Layout (header, main, modal)
│   ├── Components (button, card, badge)
│   └── Utilities (responsive, animations)
├── HTML
│   ├── Header (role selector, title, counters)
│   ├── Filters (search, priority, status)
│   ├── Kanban Board (4 columns)
│   ├── Admin Task Modal (create/edit)
│   └── Staff Task Modal (view/execute)
└── JavaScript
    ├── State Management (tasks, role, editing)
    ├── Role Functions (setRole, updateUIForRole)
    ├── Admin Functions (createTask, deleteTask)
    ├── Staff Functions (startTask, uploadFile, completeTask)
    ├── UI Functions (renderBoard, openModal, closeModal)
    ├── Utilities (generateId, formatDate, getInitials)
    └── Event Listeners (filters, drag/drop, keyboard)
```

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 (not tested)

**Required Features:**
- Geolocation API (for location capture)
- localStorage (for data persistence)
- FileReader API (for file uploads)
- Fetch API (for reverse geocoding)

---

Have fun testing! 🚀
