SELECT * FROM user;
SELECT * FROM sunshine;
SELECT * FROM rbt;
DELETE FROM sunshine WHERE id=141;

SELECT id_rbt,
rbt.id_user, firstname, lastname, photo_user, facebook_id,
DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at,
photo_rbt, photo_tag, rose, bud, thorn,
IF(photo_tag="rose", 1, 0) as rosetag, IF(photo_tag="bud", 1, 0) as budtag, IF(photo_tag="thorn", 1, 0) as thorntag,
IF(id_giver='10202343577684690', 1, 0) as sun
FROM rbt INNER JOIN user ON rbt.id_user = user.id_user 
LEFT JOIN sunshine ON id_rbt = id_rbt_sun 
WHERE rbt.id_user = user.id_user AND user.facebook_id != '10202343577684690'
GROUP BY id_rbt ORDER BY created_at DESC;

SELECT id_rbt, suntable.id_user, firstname, lastname, photo_user, facebook_id,
created_at, photo_rbt, photo_tag, rose, bud, thorn, rosetag, budtag, thorntag,
max(sunvalue) as sun
FROM (SELECT id_rbt, rbt.id_user, firstname, lastname, photo_user, facebook_id, id_giver,
DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, photo_tag, rose, bud, thorn,
IF(photo_tag="rose", 1, 0) as rosetag, IF(photo_tag="bud", 1, 0) as budtag, IF(photo_tag="thorn", 1, 0) as thorntag,
IF(id_giver='10202343577684690', 1, 0) as sunvalue FROM rbt
INNER JOIN user ON rbt.id_user = user.id_user LEFT JOIN sunshine ON id_rbt = id_rbt_sun) AS suntable
WHERE facebook_id != '10202343577684690' GROUP BY id_rbt ORDER BY created_at DESC;

SELECT id_rbt, suntable.id_user, firstname, lastname, photo_user, facebook_id,
created_at, photo_rbt, photo_tag, rose, bud, thorn, rosetag, budtag, thorntag, max(sunvalue) as sun

FROM (SELECT id_rbt, rbt.id_user, firstname, lastname, photo_user, facebook_id,
DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, photo_tag, rose, bud, thorn,
IF(photo_tag="rose", 1, 0) as rosetag, IF(photo_tag="bud", 1, 0) as budtag, IF(photo_tag="thorn", 1, 0) as thorntag,
IF(id_giver='+ userFacebookId +', 1, 0) as sunvalue FROM rbt
INNER JOIN user ON rbt.id_user = user.id_user LEFT JOIN sunshine ON id_rbt = id_rbt_sun) AS suntable
WHERE facebook_id != '10202343577684690' GROUP BY id_rbt ORDER BY created_at DESC;