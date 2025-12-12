# Office Hours Queue System

A real-time web applicationt aht streamlines the office hour experience for college students and professors. Students can join virutal queues remotely while professors can efficiently manage multiple office hour sessions

### For Students
- **Browse Available Office Hours** - View all active office hours across different courses and professors
- **Join Virtual Queues** - Queue up remotely without physically waiting outside
- **Real-Time Position Updates** - See your position in the queue update live
- **View Professor Notes** - See feedback and notes left by professors from sessions
- **Leave Queue** - Remove yourself from the queue if plans change

### For Professors
- **Create Office Hours** - Set up one-time or weekly recurring office hours sessions
- **Manage Queues** - View all students waiting in real-time
- **Add Student Notes** - Leave notes for students about topics discussed
- **Call Next Student** - Progress through the queue efficiently
- **Dashboard View** - See all your office hours and queue status at a glance

### Installation
1. **Clone the Repository**
    git clone https://github.com/Mickeyaj/office-hours-queue.git
    cd office-hours-queue
2. **Install Dependencies**
    npm install
3. **Set up Firebase**
    Create a new Firebase project at Firebase console
    Enable Authentication (Email/Password)
    Enable Cloud Firestore
    Copy your Firebase config
4. **Configure Firebase**
    Update `src/firebase.js` with your Firebase configuration
5. **Run the development server**
    npm start
    Open in localhost

### Deployment
    The app is deployed using Firebase Hosting:
    npm run build
    firebase deploy

