# StaffTask - Quick Start (5 minutes)

## 1. Open the App
Open `index.html` in your web browser.

---

## 2. See the New Role System

At the top of the page, you'll see:
```
👤 Admin  [👨‍💼 Admin] [👨‍🔧 Staff]
```

You can click the buttons to switch roles. Try both!

---

## 3. Admin Mode (Default)

### Looks like this:
- "➕ New Task" button visible
- Task filters visible (search, priority, status)
- Task counters in header
- 4-column Kanban board

### Try this:
1. Click "**➕ New Task**"
2. Enter:
   - Title: `Fix the pump`
   - Description: `Water pump needs repair`
   - Assigned Staff: `John Doe`
   - Priority: `High`
   - Due Date: `2025-04-30`
3. Click "**📍 Capture My Location**" (allow location)
4. Click "**Save Task**"

### Result:
Task appears in "To Do" column with your location.

---

## 4. Switch to Staff Mode

Click the **"👨‍🔧 Staff"** button at the top.

### Changes:
- "New Task" button **disappears**
- Filters **disappear**
- Counters **disappear**
- Everything else looks the same

---

## 5. Staff Executes Task

### Step 1: Click the task card
Click "Fix the pump" card you just created.

### New modal appears with:
- Task title
- Description
- Priority
- Due date
- "🚀 Start Task" button

### Step 2: Start the task
1. Click "**🚀 Start Task**"
2. Browser asks for location permission → click "Allow"
3. Location is captured (you see "✅ Location captured at")

### Result:
- Task status changes to "In Progress" (visible in board)
- Shows when task started and location captured

---

## 6. Upload Proof Files

### Still in the same modal, you now see:
- "📷 Upload Image" button
- "🎥 Upload Video" button

### Try uploading:
1. Click "**📷 Upload Image**"
2. Select any image from your computer
3. File appears in the "Upload Proof of Work" section

### Repeat for video:
1. Click "**🎥 Upload Video**"
2. Select any video file
3. Both files now show in the list

---

## 7. Complete Task

### Try this:
1. Click "**✅ Complete Task**" button
2. You'll see:
   - **Confetti animation** 🎉
   - Success message: "✅ Task completed successfully!"
   - Task moves to "Complete" column

### If you forgot to upload files:
1. Try to click "Complete Task"
2. You'll see error: "❌ Please upload at least one image or video"
3. Upload a file first, then you can complete

---

## 8. View Task Timeline

After completing, the modal shows:
```
Task Progress
▶ Task Started
  (date and location)
✓ Task Completed
  (date)
```

---

## 9. Switch Back to Admin

Click "**👨‍💼 Admin**" button.

### Now you see:
- All the buttons and filters again
- Completed task in "Complete" column
- If you click the task, you can see:
  - Location where staff started
  - All uploaded files are visible
  - Activity log of all changes

---

## What Got Stored?

Everything is saved automatically in your browser:
- ✅ All tasks
- ✅ Your current role (Admin/Staff)
- ✅ Uploaded files
- ✅ Task start times and locations

**Refresh the page** → Everything is still there!

---

## Common Questions

### Q: Where are the files stored?
A: In your browser's localStorage (a local database). The files are converted to base64 and stored there.

### Q: Can I use this with real files?
A: Yes! Upload any image or video from your computer.

### Q: What happens if I switch roles?
A: All data stays. Just the UI changes to show different features.

### Q: What if I clear browser data?
A: Everything will be deleted. To save:
- Export tasks (not yet implemented)
- Or keep browser data

### Q: Can I upload files larger than 10MB?
A: No, the app will show error "File too large (max 10MB)".

---

## Test Scenarios

### Scenario 1: Complete workflow
```
Admin Mode:
1. Create task "Install camera"
2. Assign to "Jane Smith"
3. Set priority "High"

Staff Mode:
1. Click task
2. Start task (location captured)
3. Upload photo "camera-installed.jpg"
4. Complete task
5. See confetti 🎉

Admin Mode:
1. Click task
2. See all details, location, file uploaded
```

### Scenario 2: Multiple tasks
```
Admin Mode:
1. Create 3-4 tasks
2. Assign different staff

Staff Mode:
1. See all tasks
2. Start one task
3. Upload proof
4. Complete it
5. See other tasks waiting
```

### Scenario 3: Error handling
```
Staff Mode:
1. Start a task
2. Upload image "proof.jpg"
3. Try to complete WITHOUT uploading video
4. See error: "Please upload at least one..."
5. Upload image "before.jpg"
6. Now you can complete
```

---

## Keyboard Shortcuts

- `Escape` - Close any modal

---

## Reset Data

To start fresh:
1. Press `F12` (Developer Tools)
2. Go to "Application" tab
3. Find "Local Storage"
4. Delete `stafftask_tasks` and `stafftask_role`
5. Refresh page

---

## Next Steps

- Read `TESTING_GUIDE.md` for comprehensive testing
- Read `CHANGES.md` for technical details
- Try different scenarios
- Test on different browsers
- Test on mobile (responsive)

---

## It's Ready!

✅ Role-based admin/staff system  
✅ Task creation (admin)  
✅ Task execution (staff)  
✅ Location capture  
✅ File upload  
✅ Task completion validation  
✅ Beautiful dark UI  
✅ Data persistence  

**Go ahead and test it! 🚀**
