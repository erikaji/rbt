# VIEWING TABLES
SELECT * FROM rbt; # this allows you to view the entire table
SELECT * FROM user;
SELECT * FROM user WHERE (id_user=2); # specify which rows/cols to view
SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user);
SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = 2) ORDER BY created_at DESC;
SELECT id_rbt, rbt.id_user, DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, rose, bud, thorn, user.id_user, name, photo_user, facebook_id FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user != 2) ORDER BY created_at DESC;



# INSERTING NEW ROWS
INSERT INTO user VALUES (1, 'Priya', 'Shekar', 'https://scontent-b.xx.fbcdn.net/hphotos-prn1/t1.0-9/1625699_10151879794022816_1076038618_n.jpg');
INSERT INTO user VALUES (2, 'Yiju', 'Hou', 'https://scontent-a.xx.fbcdn.net/hphotos-prn2/t1.0-9/10271503_10202037355675443_6443827598245086838_n.jpg');
INSERT INTO user VALUES (3, 'Erika', 'Ji', 'https://scontent-a.xx.fbcdn.net/hphotos-prn1/t1.0-9/1604490_10202038907588128_2759668069327214083_n.jpg');
INSERT INTO rbt VALUES (1, 1, 'http://farm4.static.flickr.com/3576/3409781494_5a47a398f9.jpg', 'feeling better/validated about being a zen perfectionist', 'Grad Formal tonight!', 'research is dragging on a bit...');
INSERT INTO rbt VALUES (2, 3, 'https://dl-web.dropbox.com/get/Senior%20Formal%20Photos/Photo%20May%2002%2C%208%2039%2001%20PM.jpg?_subject_uid=25436882&w=AAAuWtmvmM9TFf_-3G4aUXWyPi9Wf_wzoXFDme8CJmQPyw', 'went to Senior Formal and really enjoyed getting to see everyone :)', 'my best friend, Sam, is visiting from Wash U next week!!', 'I need to have a long talk with a close friend, and I\'m worried about how that will end up.');
INSERT INTO rbt VALUES (3, 2, 'https://scontent-b.xx.fbcdn.net/hphotos-prn2/l/t1.0-9/10322835_10202037364395661_1467112648536831122_n.jpg', 'Senior Formal!', 'Big dance', 'Presentation next week');
INSERT INTO rbt VALUES (10, 2, NOW(), '25e0d771176d3a73fc71beb4d9a03b4de6abe91315ec7e6b5a4a2af35323f0d1', 'newest rose', 'newest bud', 'newest thorn');
INSERT INTO rbt(id_user, created_at, photo_rbt, rose, bud, thorn) VALUES (2, NOW(), '25e0d771176d3a73fc71beb4d9a03b4de6abe91315ec7e6b5a4a2af35323f0d1', 'wayy newest rose', 'wayy newest bud', 'wayy newest thorn');

# ALTERING & ADDING COLUMNS
ALTER TABLE user MODIFY photo VARCHAR(200);
ALTER TABLE rbt MODIFY photo VARCHAR(200);
ALTER TABLE rbt MODIFY rose VARCHAR(200);
ALTER TABLE rbt MODIFY bud VARCHAR(200);
ALTER TABLE rbt MODIFY thorn VARCHAR(200);
ALTER TABLE rbt CHANGE COLUMN photo photo_rbt VARCHAR(200);
ALTER TABLE user CHANGE COLUMN photo photo_user VARCHAR(200);
ALTER TABLE user CHANGE COLUMN name firstname VARCHAR(200);
ALTER TABLE user ADD COLUMN lastname VARCHAR(200);
ALTER TABLE user MODIFY lastname VARCHAR(45);
ALTER TABLE rbt MODIFY id_rbt AUTO_INCREMENT = 0;


# UPDATING VALUES
UPDATE user SET photo='https://scontent-b.xx.fbcdn.net/hphotos-prn1/t1.0-9/1625699_10151879794022816_1076038618_n.jpg' WHERE id_user=1;
UPDATE rbt SET rbt_photo='https://dl.dropboxusercontent.com/u/25436882/rose.jpg' WHERE rbt_id=2;
UPDATE rbt SET rose='newest rose' WHERE id_rbt=8;
UPDATE rbt SET created_at='2014-05-21 22:46:59' WHERE id_rbt=8;
UPDATE rbt SET created_at='2014-05-21 15:46:59' WHERE id_rbt=9;
UPDATE rbt SET photo='' WHERE id_user=1;
UPDATE rbt SET rose='' WHERE id_user=1;
UPDATE rbt SET bud='' WHERE id_user=1;
UPDATE rbt SET thorn='' WHERE id_user=1;
UPDATE user SET firstname='Priya' WHERE id_user=1;
UPDATE user SET firstname='Yiju' WHERE id_user=2;
UPDATE user SET firstname='Erika' WHERE id_user=3;
UPDATE user SET lastname='Shekar' WHERE id_user=1;
UPDATE user SET lastname='Hou' WHERE id_user=2;
UPDATE user SET lastname='Ji' WHERE id_user=3;
UPDATE rbt SET rose='newrose' WHERE id_rbt=3;


# DELETING ROWS
DELETE FROM rbt WHERE id_rbt=0;