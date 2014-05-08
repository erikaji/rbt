# VIEWING TABLES
SELECT * FROM rbt; # this allows you to view the entire table
SELECT * FROM user WHERE (id_user=2); # specify which rows/cols to view
SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user);

# INSERTING ROWS
INSERT INTO rbt VALUES (1, 1, '2014-05-05 17:22:00', 'http://farm4.static.flickr.com/3576/3409781494_5a47a398f9.jpg', 'feeling better/validated about being a zen perfectionist', 'Grad Formal tonight!', 'research is dragging on a bit...');
INSERT INTO rbt VALUES (2, 3, '2014-05-05 17:21:00', 'https://dl-web.dropbox.com/get/Senior%20Formal%20Photos/Photo%20May%2002%2C%208%2039%2001%20PM.jpg?_subject_uid=25436882&w=AAAuWtmvmM9TFf_-3G4aUXWyPi9Wf_wzoXFDme8CJmQPyw', 'went to Senior Formal and really enjoyed getting to see everyone :)', 'my best friend, Sam, is visiting from Wash U next week!!', 'I need to have a long talk with a close friend, and I\'m worried about how that will end up.');
INSERT INTO rbt VALUES (3, 2, '2014-05-05 17:23:00', 'https://scontent-b.xx.fbcdn.net/hphotos-prn2/l/t1.0-9/10322835_10202037364395661_1467112648536831122_n.jpg', 'Senior Formal!', 'Big dance', 'Presentation next week');

# ALTERING COLUMNS
ALTER TABLE user MODIFY photo VARCHAR(200);
ALTER TABLE rbt MODIFY photo VARCHAR(200);
ALTER TABLE rbt MODIFY rose VARCHAR(200);
ALTER TABLE rbt MODIFY bud VARCHAR(200);
ALTER TABLE rbt MODIFY thorn VARCHAR(200);

ALTER TABLE rbt CHANGE COLUMN photo photo_rbt VARCHAR(200);
ALTER TABLE user CHANGE COLUMN photo photo_user VARCHAR(200);

# UPDATING VALUES
UPDATE user SET photo='https://scontent-b.xx.fbcdn.net/hphotos-prn1/t1.0-9/1625699_10151879794022816_1076038618_n.jpg' WHERE id_user=1;
UPDATE rbt SET photo='http://farm4.static.flickr.com/3576/3409781494_5a47a398f9.jpg' WHERE id_rbt=1;

UPDATE rbt SET photo='' WHERE id_user=1;
UPDATE rbt SET rose='' WHERE id_user=1;
UPDATE rbt SET bud='' WHERE id_user=1;
UPDATE rbt SET thorn='' WHERE id_user=1;

# DELETING ROWS
DELETE FROM rbt WHERE id_rbt=2;

UPDATE rbt SET rose='newrose' WHERE id_rbt=3;