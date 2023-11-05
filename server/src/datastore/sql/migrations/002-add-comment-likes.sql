CREATE TABLE
    comments (
        id VARCHAR NOT NULL PRIMARY KEY,
        userId VARCHAR NOT NULL,
        opportunityId VARCHAR NOT NULL,
        comment VARCHAR NOT NULL,
        postedAt INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id),
        FOREIGN KEY (opportunityId ) REFERENCES opportunities  (id)
    );

CREATE TABLE
    likes (
        userId VARCHAR NOT NULL,
        opportunityId  VARCHAR NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id),
        FOREIGN KEY (opportunityId ) REFERENCES opportunities   (id),
        PRIMARY KEY (userId, opportunityId )
    );