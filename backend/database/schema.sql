-- ============================================
-- CodeSync Database Schema
-- Oracle Database
-- ============================================

-- USERS
CREATE TABLE USERS (
    UserID NUMBER PRIMARY KEY,
    Name VARCHAR2(100) NOT NULL,
    Email VARCHAR2(150) UNIQUE NOT NULL,
    Password VARCHAR2(255) NOT NULL,
    Department VARCHAR2(100)
);

-- REPOSITORY
CREATE TABLE REPOSITORY (
    RepoID NUMBER PRIMARY KEY,
    RepoName VARCHAR2(150) NOT NULL,
    Description VARCHAR2(500),
    Visibility VARCHAR2(10) DEFAULT 'PRIVATE'
        CHECK (Visibility IN ('PUBLIC', 'PRIVATE')),
    OwnerID NUMBER NOT NULL,
    CreatedDate DATE DEFAULT SYSDATE,

    CONSTRAINT fk_repo_user
        FOREIGN KEY (OwnerID)
        REFERENCES USERS(UserID)
);

-- FILES
CREATE TABLE FILES (
    FileID NUMBER PRIMARY KEY,
    RepoID NUMBER NOT NULL,
    FileName VARCHAR2(200) NOT NULL,
    FileType VARCHAR2(50),
    UploadDate DATE DEFAULT SYSDATE,

    CONSTRAINT fk_file_repo
        FOREIGN KEY (RepoID)
        REFERENCES REPOSITORY(RepoID)
        ON DELETE CASCADE
);

-- VERSION
CREATE TABLE VERSION (
    VersionID NUMBER PRIMARY KEY,
    FileID NUMBER NOT NULL,
    VersionNumber NUMBER NOT NULL
        CHECK (VersionNumber > 0),
    CommitMessage VARCHAR2(500),
    ModifiedDate DATE DEFAULT SYSDATE,

    CONSTRAINT fk_version_file
        FOREIGN KEY (FileID)
        REFERENCES FILES(FileID)
        ON DELETE CASCADE,

    CONSTRAINT uq_file_version
        UNIQUE (FileID, VersionNumber)
);

-- COMMENTS
CREATE TABLE COMMENTS (
    CommentID NUMBER PRIMARY KEY,
    RepoID NUMBER NOT NULL,
    UserID NUMBER NOT NULL,
    CommentText VARCHAR2(1000) NOT NULL,
    CommentDate DATE DEFAULT SYSDATE,

    CONSTRAINT fk_comment_repo
        FOREIGN KEY (RepoID)
        REFERENCES REPOSITORY(RepoID)
        ON DELETE CASCADE,

    CONSTRAINT fk_comment_user
        FOREIGN KEY (UserID)
        REFERENCES USERS(UserID)
        ON DELETE CASCADE
);

-- ============================================
-- Repository ID Sequence
-- ============================================

CREATE SEQUENCE REPOSITORY_SEQ
START WITH 105
INCREMENT BY 1;

-- ============================================
-- Sample Users
-- ============================================

INSERT INTO USERS
(UserID, Name, Email, Password, Department)
VALUES
(1, 'Akansha', 'akansha@codesync.com', 'pass123', 'Computer Science');

INSERT INTO USERS
(UserID, Name, Email, Password, Department)
VALUES
(2, 'Swati', 'swati@codesync.com', 'pass123', 'Computer Science');

INSERT INTO USERS
(UserID, Name, Email, Password, Department)
VALUES
(3, 'Rahul', 'rahul@codesync.com', 'pass123', 'Information Technology');

INSERT INTO USERS
(UserID, Name, Email, Password, Department)
VALUES
(4, 'Priya', 'priya@codesync.com', 'pass123', 'Computer Science');

INSERT INTO USERS
(UserID, Name, Email, Password, Department)
VALUES
(5, 'Arun', 'arun@codesync.com', 'pass123', 'Information Technology');

INSERT INTO USERS
(UserID, Name, Email, Password, Department)
VALUES
(6, 'Neha', 'neha@codesync.com', 'pass123', 'Information Technology');

INSERT INTO USERS
(UserID, Name, Email, Password, Department)
VALUES
(7, 'Karthik', 'karthik@codesync.com', 'pass123', 'Computer Science');

INSERT INTO USERS
(UserID, Name, Email, Password, Department)
VALUES
(8, 'Meera', 'meera@codesync.com', 'pass123', 'Information Technology');

INSERT INTO USERS
(UserID, Name, Email, Password, Department)
VALUES
(9, 'Ram', 'Ram@codesync.com', 'pass123', 'Computer Science');

INSERT INTO USERS
(UserID, Name, Email, Password, Department)
VALUES
(10, 'Ananya', 'ananya@codesync.com', 'pass123', 'Computer Science');

-- ============================================
-- Sample Repositories
-- ============================================

INSERT INTO REPOSITORY
(RepoID, RepoName, Description, Visibility, OwnerID)
VALUES
(101, 'CodeSync', 'Cloud based coding repository platform', 'PUBLIC', 1);

INSERT INTO REPOSITORY
(RepoID, RepoName, Description, Visibility, OwnerID)
VALUES
(102, 'StudentPortal', 'Student management and portal system', 'PRIVATE', 2);

INSERT INTO REPOSITORY
(RepoID, RepoName, Description, Visibility, OwnerID)
VALUES
(103, 'LibrarySystem', 'Library management application', 'PUBLIC', 3);

INSERT INTO REPOSITORY
(RepoID, RepoName, Description, Visibility, OwnerID)
VALUES
(104, 'WeatherApp', 'Weather information application', 'PUBLIC', 4);

INSERT INTO REPOSITORY
(RepoID, RepoName, Description, Visibility, OwnerID)
VALUES
(105, 'WebsiteDemo', 'Demonstration website project', 'PUBLIC', 1);

INSERT INTO REPOSITORY
(RepoID, RepoName, Description, Visibility, OwnerID)
VALUES
(106, 'AttendanceSystem', 'Student attendance management system', 'PRIVATE', 5);

INSERT INTO REPOSITORY
(RepoID, RepoName, Description, Visibility, OwnerID)
VALUES
(107, 'OnlineCompiler', 'Online code compilation platform', 'PUBLIC', 6);

INSERT INTO REPOSITORY
(RepoID, RepoName, Description, Visibility, OwnerID)
VALUES
(108, 'ChatApplication', 'Real time student chat application', 'PRIVATE', 7);

INSERT INTO REPOSITORY
(RepoID, RepoName, Description, Visibility, OwnerID)
VALUES
(109, 'ExpenseTracker', 'Personal expense tracking application', 'PUBLIC', 8);

INSERT INTO REPOSITORY
(RepoID, RepoName, Description, Visibility, OwnerID)
VALUES
(110, 'QuizApplication', 'Online quiz and assessment system', 'PUBLIC', 9);

-- ============================================
-- Sample Files
-- ============================================

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(201, 101, 'server.js', 'JavaScript');

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(202, 101, 'database.sql', 'SQL');

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(203, 101, 'README.md', 'Markdown');

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(204, 102, 'student.java', 'Java');

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(205, 103, 'library.py', 'Python');

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(206, 104, 'weather.js', 'JavaScript');

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(207, 106, 'attendance.java', 'Java');

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(208, 107, 'compiler.py', 'Python');

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(209, 108, 'chat.js', 'JavaScript');

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(210, 109, 'expenses.java', 'Java');

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(211, 110, 'quiz.py', 'Python');

INSERT INTO FILES
(FileID, RepoID, FileName, FileType)
VALUES
(212, 105, 'index.html', 'HTML');

-- ============================================
-- Sample Versions
-- ============================================

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(301, 201, 1, 'Initial server implementation');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(302, 201, 2, 'Added authentication module');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(303, 201, 3, 'Improved error handling');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(304, 202, 1, 'Initial database schema');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(305, 202, 2, 'Added foreign key constraints');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(306, 203, 1, 'Created project documentation');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(307, 203, 2, 'Updated installation instructions');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(308, 204, 1, 'Created student management module');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(309, 204, 2, 'Added student search feature');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(310, 205, 1, 'Created library management module');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(311, 205, 2, 'Added book search feature');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(312, 206, 1, 'Created weather application');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(313, 207, 1, 'Created attendance module');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(314, 207, 2, 'Added attendance reports');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(315, 208, 1, 'Created compiler module');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(316, 208, 2, 'Added code execution support');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(317, 209, 1, 'Created chat application');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(318, 210, 1, 'Created expense tracker');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(319, 211, 1, 'Created quiz application');

INSERT INTO VERSION
(VersionID, FileID, VersionNumber, CommitMessage)
VALUES
(320, 212, 1, 'Created website homepage');
-- ============================================
-- Sample Comments
-- ============================================

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(401, 101, 2, 'Good repository structure!');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(402, 101, 3, 'Authentication module can be improved.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(403, 102, 1, 'Student module is working correctly.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(404, 103, 4, 'Library search feature looks useful.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(405, 104, 5, 'Weather interface is simple and clear.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(406, 105, 2, 'Website design looks good.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(407, 106, 3, 'Attendance reports are useful.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(408, 107, 4, 'Compiler implementation is interesting.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(409, 108, 5, 'Chat application needs more features.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(410, 109, 6, 'Expense tracking is easy to understand.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(411, 110, 7, 'Quiz application works well.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(412, 101, 8, 'The documentation is helpful.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(413, 103, 9, 'Book search could be improved.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(414, 107, 10, 'Code execution feature is useful.');

INSERT INTO COMMENTS
(CommentID, RepoID, UserID, CommentText)
VALUES
(415, 109, 2, 'The expense categories are well organized.');

COMMIT;