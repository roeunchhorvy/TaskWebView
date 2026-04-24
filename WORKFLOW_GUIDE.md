# StaffTask - Complete Workflow Guide

## Overview

StaffTask is a task management application with separate workflows for **Admins** (create and manage tasks) and **Staff** (execute tasks with location and proof).

---

## 👨‍💼 Admin Workflow

### Admin Role
- Can create new tasks
- Can edit existing tasks
- Can delete tasks
- Cannot upload proof or capture location
- Manages task assignments and deadlines

### How Admins Create a Task

**Step 1: Click "➕ New Task" button**
- Located in the header (only visible in Admin mode)
- Opens the task creation modal

**Step 2: Fill in task details**
```
Task Title *        (Required - the task name)
Description         (Optional - what needs to be done)
Assigned Staff      (Optional - staff member name)
Priority *          (Required - High/Medium/Low)
Due Date            (Optional - when task is due)
Status              (Defaults to "To Do")
```

**Step 3: Click "Save Task"**
- Task is created and appears in the "To Do" column
- Task is automatically saved to browser localStorage
- Admin can now see the task in the Kanban board

### How Admins Edit a Task

**Step 1: Click on a task card** (Admin mode only)
- Opens the edit modal
- Shows all task details

**Step 2: Modify fields**
- Change title, description, priority, assignee, due date
- Can edit already-started or completed tasks

**Step 3: Click "Save Task"**
- Changes are saved
- Activity log updated
- Board re-renders with new data

### How Admins Delete a Task

**Step 1: Open task modal** (click task card)

**Step 2: Click "Delete" button**
- Red button at the bottom of the form
- Only appears in edit mode (not in new task mode)
- Requires confirmation

**Step 3: Confirm deletion**
- Task is removed from board
- Deleted from localStorage
- Cannot be recovered

---

## 👨‍🔧 Staff Workflow

### Staff Role
- **Cannot** create tasks
- **Can** view assigned tasks
- **Can** start tasks (capture location)
- **Can** upload proof files (image/video)
- **Can** complete tasks (with proof validation)

### Staff View
When staff switches to Staff mode:
- "➕ New Task" button is **hidden** (no creation allowed)
- Task filters are **hidden** (no filtering UI)
- Task counters are **hidden** (no statistics)
- Kanban board shows only task cards
- Demo tasks auto-created if board is empty

---

## 📍 Start Task + Capture Location

### To Do Task Card (Staff View)
```
[Task Card]
├─ Title: "Visit customer site"
├─ Description: "Check site condition and upload proof"
├─ Priority: 🔴 High
├─ Due: Apr 30
└─ Button: "📍 Start Task & Capture Location"
```

### Click "📍 Start Task & Capture Location"

**Step 1: Browser requests location permission**
- Message: "Allow location access?"
- You must click "Allow" to continue
- If you click "Deny", you'll see error message

**Step 2: Loading state**
- Button shows: `⟳ Getting location...`
- Button is disabled during capture
- Typically takes 2-5 seconds

**Step 3: Location captured**
Button returns to normal
- App captures:
  - GPS Latitude (e.g., 13.7563°)
  - GPS Longitude (e.g., 100.5018°)
  - Address via reverse geocoding (e.g., "Bangkok, Thailand")
  - Start timestamp

**Step 4: Task status changes to "In Progress"**
- Task automatically moves to "In Progress" column
- Board re-renders with new location info

### Success Message
```
✅ Task started! Location: Bangkok, Thailand
```

### Error Messages
```
❌ Location permission denied. Please enable location access in browser settings.
❌ Geolocation not supported in your browser
❌ Error: [specific error message]
```

---

## 📍 Location Preview Card

After location is captured, staff sees:

```
┌─────────────────────────────────────┐
│ 📍 Bangkok, Thailand                │
│ 13.756300, 100.501800              │
│ ┌─────────────────────────────────┐ │
│ │   [Embedded OpenStreetMap]       │ │
│ │   with location marker           │ │
│ │   (120px height)                 │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Location Card Shows:**
- Address: City/town name (in cyan)
- Coordinates: Latitude, longitude (precise decimal format)
- Mini-map: Embedded OpenStreetMap with marker at location
- Styling: Rounded box with cyan border, semi-transparent background

**How Map Works:**
- Uses OpenStreetMap (free, open-source)
- Shows 0.01° x 0.01° area around location (about 1km × 1km)
- Red/cyan marker shows exact spot where task started
- Can zoom and pan in the embedded map

---

## 📤 Upload Proof Files

After starting task, staff sees upload section:

```
┌──────────────────────────────────┐
│ [📷 Image]  [🎥 Video]           │
│                                  │
│ ✓ 0 file(s) uploaded ⚠️          │
│ (Must upload before completing)  │
└──────────────────────────────────┘
```

### Upload Image

**Step 1: Click "📷 Image" button**
- Opens file browser
- Filters to image files only

**Step 2: Select image from your computer**
- Supported formats: JPG, PNG, GIF, WebP
- Max size: 50MB
- Shows: "📤 Uploading image..."

**Step 3: Image preview appears**
```
┌────────────────────────────────────┐
│ [Image thumbnail]  photo.jpg       │
│                    2048.5 KB  [✕]  │
└────────────────────────────────────┘
```

- Shows actual image thumbnail (60px × 60px)
- Displays file name
- Shows file size in KB
- ✕ button to remove file

### Upload Video

**Step 1: Click "🎥 Video" button**
- Opens file browser
- Filters to video files only

**Step 2: Select video from computer**
- Supported formats: MP4, WebM, OGG, MOV, AVI
- Max size: 50MB
- Shows: "📤 Uploading video..."

**Step 3: Video preview appears**
```
┌────────────────────────────────────┐
│ [🎥]  progress_video.mp4           │
│       15234.2 KB            [✕]    │
└────────────────────────────────────┘
```

- Shows video icon (🎥) instead of thumbnail
- Displays file name
- Shows file size in KB
- ✕ button to remove file

### Multiple Files

Staff can upload multiple images and videos:

```
✓ 1 file uploaded
- photo1.jpg (2 KB)

✓ 2 files uploaded
- photo1.jpg (2 KB)
- video1.mp4 (15 MB)

✓ 3 files uploaded
- photo1.jpg (2 KB)
- photo2.jpg (3 KB)
- video1.mp4 (15 MB)
```

Each time a file uploads:
- Message: `✅ Image uploaded! (1 file total)`
- Message: `✅ Video uploaded! (2 files total)`

### Remove File

Click the ✕ button on any file preview:
- File is immediately removed
- Message: `📎 File removed`
- Count updates

---

## ✅ Complete Task

### Before Completing
```
In Progress Card
├─ Location card shown
├─ Upload buttons shown
├─ File previews shown
├─ Complete button is DISABLED (greyed out)
└─ Message: "⚠️ Upload at least 1 proof file"
```

### Complete Task Steps

**Step 1: Upload at least 1 image or video**
- Staff must have file preview showing
- Button becomes ENABLED (bright green)

**Step 2: Click "✅ Complete Task"**
- Confirmation dialog appears:
  ```
  Complete this task?
  
  Task: Visit customer site
  Proof files: 2
  
  [Yes]  [Cancel]
  ```

**Step 3: Confirm completion**
- Click "Yes" to confirm
- Task is marked as complete
- Confetti animation plays 🎉
- Success message appears

### Task Completed Card

After completion:
```
┌─────────────────────────────────┐
│ ✅ Task Completed               │
│ April 24, 2025, 2:34:56 PM      │
│                                 │
│ 📍 Bangkok, Thailand            │
│ 13.756300, 100.501800          │
│                                 │
│ 📎 2 proof file(s)              │
└─────────────────────────────────┘
```

**Shows:**
- Completion status with checkmark
- Exact completion date and time
- Location where task was completed
- GPS coordinates
- Number of proof files uploaded
- **No action buttons** (read-only)

### Success Message
```
✅ Task completed successfully! Great work!
```

---

## 🚫 Blocked Tasks

Blocked tasks show:
```
[Task Card]
├─ Title
├─ Description
├─ Status: Blocked
└─ (No action buttons)
```

**Staff cannot:**
- Start blocked tasks
- Upload files for blocked tasks
- Complete blocked tasks

**Admin must:**
- Edit the task status to "In Progress" or "To Do"
- Or delete the blocked task

---

## 💾 Data Storage

All data is saved in browser **localStorage**:

### What's Stored
- **stafftask_tasks**: Array of all task objects (JSON)
- **stafftask_role**: Current user role ("admin" or "staff")

### When Data Updates
- After creating task
- After editing task
- After deleting task
- After starting task
- After uploading file
- After removing file
- After completing task
- After changing role

### Data Persistence
- Data survives page refresh (F5)
- Data survives closing and reopening browser
- Data is **only** on this computer (not synced across devices)
- Clearing browser data will delete all tasks

### Example Task Object
```javascript
{
  id: "abc123xyz",
  title: "Visit customer site",
  description: "Check condition and upload proof",
  assignee: "Staff",
  priority: "high",
  dueDate: "2025-04-30",
  status: "complete",
  location: null,
  
  // Staff execution fields
  startedAt: 1724862345000,  // When staff started
  completedAt: 1724862789000,  // When staff completed
  startLocation: {
    lat: 13.7563,
    lng: 100.5018,
    address: "Bangkok, Thailand"
  },
  uploadedFiles: [
    {
      id: "file1",
      type: "image",
      name: "photo.jpg",
      size: 2048576,
      data: "data:image/jpeg;base64,...",  // Base64 encoded
      uploadedAt: 1724862567000
    },
    {
      id: "file2",
      type: "video",
      name: "video.mp4",
      size: 15728640,
      data: "data:video/mp4;base64,...",  // Base64 encoded
      uploadedAt: 1724862678000
    }
  ],
  
  activity: [
    { action: "Created", timestamp: 1724862000000 },
    { action: "Task started at Bangkok, Thailand", timestamp: 1724862345000 },
    { action: "Image uploaded: photo.jpg", timestamp: 1724862567000 },
    { action: "Video uploaded: video.mp4", timestamp: 1724862678000 },
    { action: "Task completed with 2 proof file(s)", timestamp: 1724862789000 }
  ]
}
```

---

## 🔄 Complete Task Lifecycle Example

### 1️⃣ Admin Creates Task
```
Admin: Click ➕ New Task
Admin: Enter "Visit customer site"
Admin: Priority: High
Admin: Due Date: April 30
Admin: Assigned to: "Staff"
Admin: Click Save
Result: Task appears in "To Do" column
```

### 2️⃣ Staff Starts Task
```
Staff: Switches to Staff mode
Staff: Sees task card in "To Do" column
Staff: Clicks "📍 Start Task & Capture Location"
System: Asks browser for location permission
Staff: Clicks "Allow"
System: Gets GPS coordinates (13.7563°, 100.5018°)
System: Reverse geocodes to "Bangkok, Thailand"
System: Shows location preview with map
Result: Task moves to "In Progress" column
```

### 3️⃣ Staff Uploads Proof
```
Staff: Sees upload buttons on task card
Staff: Clicks "📷 Image"
Staff: Selects "photo1.jpg" (2 MB)
System: Shows image preview
Staff: Clicks "🎥 Video"
Staff: Selects "video1.mp4" (20 MB)
System: Shows video preview
Result: File counter shows "✓ 2 files uploaded"
```

### 4️⃣ Staff Completes Task
```
Staff: Clicks "✅ Complete Task"
System: Shows confirmation dialog
System: Confirms: Task title and file count
Staff: Clicks "Yes"
System: Confetti animation plays 🎉
System: Success message: "Task completed successfully!"
Result: Task moves to "Complete" column (read-only)
```

### 5️⃣ Admin Reviews Completed Task
```
Admin: Switches to Admin mode
Admin: Clicks on completed task
Admin: Sees:
  - Location: Bangkok, Thailand
  - Timestamps: Started, completed
  - 2 proof files uploaded
  - Full activity log
Admin: Can delete if needed, or leave in Complete column
```

---

## 🎯 Key Features Summary

| Feature | Admin | Staff |
|---------|-------|-------|
| Create task | ✅ | ❌ |
| Edit task | ✅ | ❌ |
| Delete task | ✅ | ❌ |
| View task | ✅ | ✅ |
| Start task | ❌ | ✅ |
| Capture location | ❌ | ✅ (when starting) |
| Upload proof | ❌ | ✅ |
| Complete task | ❌ | ✅ |
| See complete tasks | ✅ | ✅ |
| Use filters | ✅ | ❌ |
| See counters | ✅ | ❌ |
| Drag tasks | ✅ | ❌ |

---

## 💡 Tips & Tricks

### For Admins
- **Bulk operations**: Edit multiple tasks in sequence by clicking each task
- **Consistent naming**: Use clear task titles so staff understand what to do
- **Set realistic due dates**: Don't overload staff with urgent deadlines
- **Provide descriptions**: Include details like location, what to check, format for proof

### For Staff
- **Check permissions**: Make sure location is enabled in browser before starting
- **Multiple proof files**: Upload before/after photos for best results
- **Clear filenames**: Name files like "before.jpg", "after.jpg" for clarity
- **Keep files organized**: Upload as you work, don't wait until the end
- **Check storage**: Very large videos might not save if storage is full

### General
- **Refresh data**: Browser refresh (F5) reloads all data from localStorage
- **Clear data**: Browser settings → Privacy → Clear browsing data removes all tasks
- **Backup data**: Screenshot completed tasks or export before clearing data
- **Test locations**: Try starting tasks from different locations to test location accuracy

---

## ❓ Troubleshooting

### "Location permission denied" error
**Solution:**
1. Check browser address bar for "Location" permission icon
2. Click it and select "Allow"
3. Or go to browser Settings → Privacy → Location → Allow for this site
4. Try starting task again

### "File too large" error
**Solution:**
1. Reduce file size before uploading
2. Use compression tools for images/videos
3. Max file size is 50MB

### Location shows "Location captured" without address
**Likely cause:** Nominatim API is slow or offline
**Solution:**
1. Don't worry - GPS coordinates are still saved
2. Location is still accurate even without address
3. Try again if you need the address text

### Task doesn't move between columns
**Solution:**
1. Refresh the page (F5)
2. Check that you clicked the correct button
3. Make sure all required fields are filled
4. Check browser console (F12) for errors

### Data disappeared after refresh
**Likely cause:** Browser storage was cleared
**Solution:**
1. Check browser settings for "Auto-clear data on close"
2. Disable auto-clear, or manually save data first
3. Consider exporting tasks before clearing

---

## 🚀 Getting Started

### First Time Setup
1. Open index.html in browser
2. You'll be in Admin mode by default
3. Create 3 demo tasks using "➕ New Task"
4. Switch to "👨‍🔧 Staff" mode
5. Click any task's "📍 Start Task" button
6. Allow location when browser asks
7. Upload a photo or video
8. Click "✅ Complete Task"
9. See the completed task with all your proof!

### Demo Tasks to Try
1. **Site Inspection** - High priority, due soon
2. **Equipment Check** - Medium priority, good for video
3. **Progress Photos** - Multiple photos needed

---

## 📞 Support

### Common Issues

**Q: Can multiple people use this at the same time?**
A: No, this is single-user. Data is only on one computer.

**Q: Can I share tasks with my team?**
A: Not yet. This version is local only.

**Q: Can I undo a deletion?**
A: No, deletions are permanent. Be careful!

**Q: What if I reload the page?**
A: All data stays! It's saved in browser storage.

**Q: Can I export the data?**
A: Not yet, but you can take screenshots.

**Q: Does it work offline?**
A: Mostly yes, except location reverse-geocoding needs internet.

---

**Happy task managing!** 🚀
