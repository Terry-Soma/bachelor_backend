exports.template = (data)=> {
    let html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ИЗОУИС</title>
      <style>
        * {
          box-sizing: border-box;
        }
    
        .container {
          margin: 0 auto;
          background-color: antiquewhite;
        }
    
        .center {
          text-align: center;
        }
    
        .img {
          margin: 0 auto;
          text-align: center;
        }
    
        img {
          max-width: 100%;
        }
    
        h1 {
          margin-top: 20px;
        }
    
        .personal__information {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
    
        table {
          width: 100%;
          max-width: 600px;
          border-collapse: collapse;
          margin: 0 auto;
        }
    
        th,
        td {
          border: 1px solid grey;
          padding: 8px;
          text-align: left;
        }
    
        footer {
          background-color: #3532cd;
          color: #fff;
          text-align: center;
          padding: 20px;
        }
    
        hr {
          background-color: white;
          width: 70%;
          margin: 20px auto;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <div class="center">
          <div class="img">
            <img src="https://ikhzasag.edu.mn/_next/image?url=%2Fassets%2Fimages%2Flogo.png&w=1920&q=75" alt="" height="120" width="120">
          </div>
          <h1>Их засаг олон улсын сургууль</h1>
          <h1>ИЗОУИС</h1>
          <div class="personal__information">
            <h4>Lorem ipsum овогтой Lorem, ipsum. таньд энэ өдрийн мэнд хүргэе</h4>
            <div class="choosed__study">
              <h5>Таны сонгосон мэргэжлүүд</h5>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Сургуулийн нэр</th>
                    <th>Мэргэжлийн нэр</th>
                  </tr>
                </thead>
                <tbody>
                    ${data.map((el,index)=>{
                        return `<tr>
                        <td>${index + 1}</td>
                        <td>${el.sname}</td>
                        <td>${el.mname}</td>
                      </tr>`
                    })}
                  
                </tbody>
              </table>
            </div>
          </div>
    
          <footer style="margin-top:30px">
            <p>ИЗОУИС-ийг сонгосон таньд баярлалаа</p>
            <p>Монгол Улс Улаанбаатар хот. Баянзүрх дүүрэг, 4 дүгээр хороо, Б.Доржийн гудамж, Их Засаг цогцолбор</p>
            <p>Бидэнтэй холбогдох утас | (976) 70157768, 7015-7761, 7015-7765</p>
            <hr>
          </footer>
        </div>
      </div>
    </body>
    
    </html>
    `;
    return html
}

// <tr>
//                     <td>1</td>
//                     <td>ИХ ЗАСАГ ХУУЛЬ ЗҮЙН СУРГУУЛЬ</td>
//                     <td>Эрх зүй /Өдөр/</td>
//                   </tr>
//                   <tr>
//                     <td>2</td>
//                     <td>ИХ ЗАСАГ ХУУЛЬ ЗҮЙН СУРГУУЛЬ</td>
//                     <td>Эрх зүй /Өдөр/</td>
//                   </tr>
//                   <tr>
//                     <td>3</td>
//                     <td>ИХ ЗАСАГ ХУУЛЬ ЗҮЙН СУРГУУЛЬ</td>
//                     <td>Эрх зүй /Өдөр/</td>
//                   </tr>
//                   <tr>
//                     <td>4</td>
//                     <td>ИХ ЗАСАГ ХУУЛЬ ЗҮЙН СУРГУУЛЬ</td>
//                     <td>Эрх зүй /Өдөр/</td>
//                   </tr>
//                   <tr>
//                     <td>5</td>
//                     <td>ИХ ЗАСАГ ХУУЛЬ ЗҮЙН СУРГУУЛЬ</td>
//                     <td>Эрх зүй /Өдөр/</td>
//                   </tr>