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
  elsegchInfo: "SELECT * FROM `elsegchinfoview`;",
  mergejilInfo: "SELECT * FROM `allaboutmergejil`;",
  schoolAndCount: "SELECT * FROM `schoolandcount`;",
  aimagAndCount: `select count(aimag_id) Элсэгч,a.ner as name
  from elsegch
  inner join aimag a
  on a.id = aimag_id
  group by aimag_id;`,
  hutulburAndCount: `select count(h.id) as нийт, h.name
  from hutulbur h
  inner join mergejil m
  on h.id = m.hutulburId
  inner join eburtgel eb
  on eb.mergejilid= m.id
  group by h.id`,
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
  // mergejil and elsegchiin hamaaral
  getCountMergejil: `select count(mergejilId) as Элсэгчид, m.name from eburtgel e inner join mergejil m on m.Id = e.mergejilId group by mergejilId
  order by Элсэгчид desc;`,
  countEburtgel: `select count(mergejilId) as m_too from eburtgel;`,
  getCountElsegch: `select count(burtgel_Id) as too from elsegch;`,
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
  createView: `DROP VIEW IF EXISTS bachelor_beginning.hutulburview;
  CREATE VIEW  bachelor_beginning.hutulburview AS select max(case when m1.shalguuriin_turul = 2 then s.name end) AS s_name,max(case when m1.shalguuriin_turul = 2 then h.name end) AS h_name,max(case when m1.shalguuriin_turul = 2 then m.name end) AS m_name,max(case when m1.shalguuriin_turul = 2 then h.bosgo_onoo end) AS bosgo_onoo,max(case when m1.shalguuriin_turul = 2 then m1.MergejilId end) AS MergejilId,max(case when m1.shalguuriin_turul = 2 then m.mergeshil end) AS mergeshil,group_concat(case when m1.shalguuriin_turul = 2 then s1.name end separator ', ') AS shalgalt_2,group_concat(case when m1.shalguuriin_turul = 1 then s1.name end separator ', ') AS shalgalt_1 from ((((school s join hutulbur h on(s.Id = h.schoolId)) join mergejil m on(h.Id = m.hutulburId)) join mergejil_shalguur m1 on(m1.MergejilId =m.Id)) join shalguur_medeelel s1 on(m1.ShalguurId = s1.Id)) group by m.Id;`,
  approveMethod: `select s.name as school, m.name as mergejil, h.name as hutulbur from school s inner join hutulbur h on s.Id = h.SchoolId inner join mergejil m on m.HutulburId=h.Id where m.Id IN(:values)`
};
/* end ugugdliin santai shuud haritsah query bairlana i*/
