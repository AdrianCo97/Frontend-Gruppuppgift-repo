async function start() {

  // You can run any query you want against it
  let result = await db.run(/*sql*/`
      SELECT *, UP(title) AS TitleInCaps 
      FROM albums 
      WHERE title LIKE $title
  `, { title: '%kill%' });

  // Log the result of the query
  console.table(result);

  // You can ask the db which tables and views
  // that are in it
  console.log('All db tables', await db.tables());
  console.log('All db views', await db.views());
}

start();