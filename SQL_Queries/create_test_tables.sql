
Create Table Users(
	user_id int,
    username varchar(255),
    pass varchar(255),
    fav_coaches SET(''),
    rec_coaches SET(''),
    credit_card_number varchar(255),
    address varchar(255),
    zipcode int,
    state varchar(255),
    country ENUM('Canada','United States of America')
);

CREATE TABLE Coaches(
	first_name varchar(255),
    last_name varchar(255),
    video_url varchar(255),
    coach_id int,
    experience_level ENUM('Expert','Master','Genius','Linus Torivalds'),
    bio text,
    time_dropperd int,
    /* This is all of the coaches contact info */
    email varchar(255),
    phone varchar(255),
    address varchar(255)
);

Create Table Transactions (
	coach_id int,
    user_id int,
    amount int,
    transfer_date DATE
);

CREATE TABLE Appointments (
	coach_id int,
    user_id int,
	appointment_date DATE,
    confirmed boolean
);