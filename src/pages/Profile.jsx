import DashboardLayout from "../components/DashboardLayout";

function Profile() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <DashboardLayout>
      <div className="profile-header">
        <p className="eyebrow">CODESYNC PROFILE</p>
        <h1>My Profile</h1>
        <p>Manage your CodeSync account information.</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">{user?.name?.charAt(0) || "U"}</div>

        <div className="profile-info">
          <h2>{user?.name || "Demo User"}</h2>

          <p>{user?.email || "demo@example.com"}</p>

          <span>{user?.department || "Computer Science"}</span>
        </div>
      </div>

      <div className="profile-details">
        <div>
          <label>Name</label>
          <p>{user?.name || "Demo User"}</p>
        </div>

        <div>
          <label>Email</label>
          <p>{user?.email || "demo@example.com"}</p>
        </div>

        <div>
          <label>Department</label>
          <p>{user?.department || "Computer Science"}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
