module.exports = {
  mergejil_Shalgalt:
    'select m.*, ms.shalguuriin_turul, (select group_concat(s.name)) as "suuri shalgalt"from mergejil m inner join mergejil_shalguur ms on m.Id = ? and m.Id = ms.MergejilId left join shalguur_medeelel as s on ms.ShalguurId = s.Id group by ms.shalguuriin_turul',
  schoolMergejilCount: `
  select s.name, count(m.Id) as "all"
  from school as s
  inner join hutulbur as h
  on s.Id = h.schoolId and s.Id =5
  inner join mergejil as m
  on m.hutulburId = h.Id
  group by s.name;`,
  allInfo: "SELECT * FROM `hutulburview`;",
  burtgelInfo: `select e.elsegchId,
  (select group_concat(m.name)) as "mergejil", 
  el.lname,el.fname,el.email, el.rd, el.gerchilgee_dugaar, el.img, el.utas, a.ner as "aimag"
  from eburtgel e 
  inner join mergejil m 
  on m.Id = e.mergejilId 
  inner join elsegch el 
  on el.burtgel_Id = e.elsegchId 
  inner join aimag a
  on a.Id = el.aimag_id
  group by e.elsegchId;
  `,
  getCount: `select mergejilId,count(mergejilId) as "count", m.name from eburtgel e inner join mergejil m on m.Id = e.mergejilId group by mergejilId;`,
  getSchoolBurtgelCount: `select s.Id, count(e.mergejilId) as "bcount", s.slug,s.img,s.address
  from eburtgel e 
  inner join mergejil m 
  on m.Id = e.mergejilId 	
  inner join hutulbur h 
  on h.Id = m.hutulburId
  inner join school s
  on s.Id = h.schoolId
  group by s.Id;`,
  getAllBurtgel: `
  select e.burtgel_Id as "but",e.lname as "ovog",e.fname as "ner",
  e.email,(select group_concat(m.name)) as "mergejil", e.rd, e.utas, e.aimag_id as "aimag"
  from elsegch e
  inner join eburtgel eb
  on eb.elsegchId = e.burtgel_Id
  inner join mergejil m
  on eb.mergejilId = m.Id
  group by e.burtgel_Id;`,
  getMergejils: `SELECT GROUP_CONCAT(mergejilId) AS mergejils
  FROM eburtgel  
  GROUP BY elsegchId
  having elsegchId = ?`,
};
/* end ugugdliin santai shuud haritsah query bairlana i*/
