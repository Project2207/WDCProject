/*
DIRECTORY:
    TABLES
        users
        places (for location data of event)
        events
        invitations
        availablity
*/
CREATE TABLE notifications
(
	userID INT,
	type ENUM('cancel', 'final', 'response'),

	PRIMARY KEY (userID, type)
	FOREIGN KEY(userID)
		REFERENCES users(userID)
		ON DELETE CASCADE
),

CREATE TABLE users (
    userID INT AUTO_INCREMENT,
		email VARCHAR(64) UNIQUE,
    password VARCHAR(64),
		name VARCHAR(64),
    access ENUM('admin', 'user', 'guest'),

    PRIMARY KEY (userID)
),

CREATE TABLE addresses
(
    addressID INT AUTO_INCREMENT,

    street VARCHAR(256),
    streetAdd VARCHAR(256),
    suburb VARCHAR(256),
    postcode VARCHAR(16),
    state VARCHAR(64),
    country VARCHAR(64),

    PRIMARY KEY (addressID)
),

CREATE TABLE events (
    eventID INT AUTO_INCREMENT,
    creatorID INT,
    addressID INT,
		name VARCHAR(56),
		description VARCHAR(256),
		start DATETIME,
		end DATETIME,
		status ENUM ('plan', 'final', 'event') DEFAULT 'plan',

    PRIMARY KEY (eventID),
    FOREIGN KEY (creatorID)
        REFERENCES users(userID)
        ON DELETE CASCADE,
    FOREIGN KEY (addressID)
        REFERENCES addresses(addressID)
        ON DELETE SET NULL
),

-- half hour blocks
CREATE TABLE times
(
	timeID INT AUTO_INCREMENT,
	eventID INT,
	start DATETIME,

	PRIMARY KEY(timeID),
	FOREIGN KEY (eventID)
			REFERENCES events(eventID)
			ON DELETE CASCADE
),

CREATE TABLE invitations
(
	invitationID INT AUTO_INCREMENT,
	eventID INT,
	guestID INT,

	PRIMARY KEY(eventID, guestID),
	FOREIGN KEY (guestID)
			REFERENCES users(userID)
			ON DELETE CASCADE,
	FOREIGN KEY (eventID)
			REFERENCES events(eventID)
			ON DELETE CASCADE
),

CREATE TABLE availablity
(
	timeID INT,
	invitationID INT,
	available TINYINT(1),

	PRIMARY KEY (timeID, invitationID),

	FOREIGN KEY (timeID)
		REFERENCES times(timeID)
		ON DELETE CASCADE,
	FOREIGN KEY (invitationID)
			REFERENCES invitations(invitationID)
			ON DELETE CASCADE
)
