const express = require("express");
var crypto = require('crypto');
var CryptoJS = require("crypto-js");

const app = express();
app.use(express.json());
var jwt = require("jsonwebtoken");

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

const port = 3000;

function parser (e) {
  for (var t = e.length, n = [], r = 0; r < t; r++)
      n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;

 return init(n,t);
}   
function init (e, t) {
  var wordobject = {}
  e = wordobject.words = e || [],
  wordobject.sigBytes = null != t ? t : 4 * e.length;
  return wordobject;
}

app.post("/reddoorz",(req,res)=>{
  let jsonbody = {
    "first_name": req.body.firstname,
    "last_name": req.body.lastname,
    "email": req.body.email,
    "phone": req.body.phone,
    "password": req.body.password,
    "confirm_password": req.body.password,
    "is_unsubscribed": true,
    "captcha": req.body.captcha,
    "version": "v2",
    "rectView": "vue",
    "source": "LoginActivity"
  }
var data = CryptoJS.AES.encrypt(parser(JSON.stringify(jsonbody)) ,parser("UiQ1TmNyeXBUITBuJDVDUmV0KEBRJH0="), { iv: parser("jm8lgqa3j1d0ajus") });
  res.send({"data":data.ciphertext.toString(CryptoJS.enc.Base64)+"---am04bGdxYTNqMWQwYWp1cw=="})
  //res.send(jsonbody);
})

app.post("/generatetoken", (req, res) => {
  let jwtSecretKey =
    "zkbzRk11dSbaQjGTDRcw8yhInNFIyl6MHLZOISPwWy2DR5kqGuuaXvzU6qxCUUjIp1WBWNcGn6zsXy7kiptLsENH5cVOyRpFTOgG";

  const token = jwt.sign(req.body, jwtSecretKey);
  res.send(token);
});
app.post("/generatesign", (req, res) => {
  console.log((new Date).getTime())
    const value= "appid="+req.body.appid+"&captcha_id="+req.body.captcha_id+"&captcha_output="+req.body.captcha_output+"&convertPOST="+req.body.convertPOST+"&gen_time="+req.body.gen_time+"&lot_number="+req.body.lot_number+"&mobile="+req.body.mobile+"&pass_token="+req.body.pass_token+"&randomstr="+req.body.randomstr+"&timestamp="+req.body.timestamp+"&type="+req.body.type
    const value2="appid=190219&area_code=+961&convertPOST=1&country_symbol=lebanon&randomstr=m2EbyR&timestamp="+(new Date).getTime()*1000
    let test = crypto.createHmac('sha256', "5ca5087fd74a5afd5cb1cad3016e4980").update(value).digest("hex");
    res.send( crypto.createHash('md5').update(test).digest("hex"))
    // res.send(test)
    // "appid=190219&captcha_id=665e9c337f2707b937bcad6f8b0eaccb&captcha_output=9Xoj78Kg-iSYvHMmeT3TLt-QFAGjqn_duh0hF50MCVEjjLw62Pd06M_Ctiy8MoKPZ0Ne4k8tXVYY2uHEXBkRrqv3YAMknEWwvJcM5EuEk1yYwn5cDlygWJWxDIG4MUDITEuXs7C7Q167cXZISsve1vdPkr-wmnQKocYeLrzNYnDNMt3Cj3KJ624c8GCNL_tPHq2wWk1lUW0DqqjTT3QJn3sUla1p7_lqCBohapejTWI=&convertPOST=1&gen_time=1667980513&lot_number=cc6aeca1ab1e4cb9ab220b1f1dd474d4&mobile=(+62)88172171271&pass_token=f24845efff0752980c28043ca69aab468ffdf5f796d4b6cbb1529e16e3f3c804&randomstr=p3bds6&timestamp=1667980522380&type=reg_h5"
  
  });
  app.post("/lalamove",(req,res)=>{
    var seconds = Math.round(new Date().getTime() / 1000);
    console.log(seconds)
    console.log(`${new Date().getTime()}ehll${parseInt(Math.random() * (1e10 + 1), 10)}`)

    var crypto = require('crypto');
    //creating hmac object 
    var hmac = crypto.createHmac('md5', 'AKID41LHdYiVHiu73nm59RL4vllVlr9GXekw');
    //passing the data to be hashed
    const v = "GET?device_id=a5ee8fed-931c-4eb8-88d8-05682be8926a&city_id=121002&device_type=web&hlang=id_id&_m=send_verification_code&token=&is_ep=&args={\"source\":\"GLOBAL_REGISTER\",\"channel\":\"SMS\",\"human_proof\":\""+req.body.humanproof+"\",\"email\":\"sdsdsdds@sss.com\",\"phone_no\":\""+ req.body.phonenumber+"\"}&os=web&_t="+seconds+"&_su="+`${new Date().getTime()}ehll${parseInt(Math.random() * (1e10 + 1), 10)}`+"&hcountry=120000"

    data = hmac.update(v);
    //Creating the hmac in the required format
    gen_hmac= data.digest('base64');
    //Printing the output on the console
    res.send(gen_hmac)
    // console.log("hmac : " + gen_hmac);


  })
  app.post("/tiger/captcha",(req,res)=>{
    console.log(Date.now())
    let nonce=crypto.createHash('md5').update("".concat(Date.now(), "-").concat(Math.random())).digest("hex")
    const webvalue="{\"recaptcha_site_key\":\"6LcFsyEgAAAAALHyIu0-m6uiwFpZitTPqaJcv5zD\",\"recaptcha_token\":\""+req.body.recaptchatoken+"\",\"recaptcha_action\":\"verify_code_signin\"}"
    let web=crypto.createHash('md5').update(webvalue).digest("hex")
    value=  "POST/api/v1/verification/captcha/recaptcha_s="+Date.now()+"&appName=portal-v5&appVer=6.0.2&deviceId="+req.body.deviceid+"&lang=en_US&platform=web&region=SGP&vendor=web"+web+"x-ca-key:WEB_APISIGNx-ca-nonce:"+nonce+"x-ca-timestamp:"+Date.now()
    value="POST\n/api/v1/verification/captcha/recaptcha\n_s="+Date.now()+"&appName=portal-v5&appVer=6.0.2&deviceId="+req.body.deviceid+"&lang=en_US&platform=web&region=CHN&vendor=web\nd"+web+"\nx-ca-key:WEB_APISIGN\nx-ca-nonce:"+nonce+"\nx-ca-timestamp:"+Date.now()
    let signature = crypto.createHmac('sha256', "QUWmBAYddriiHcKu").update(value).digest("base64");
    res.send( 
      {
        "nonce":nonce,
        "signature":signature
      } 
    )
  })

  app.post("/tiger/sendsms",(req,res)=>{
    console.log(Date.now())
    let nonce=crypto.createHash('md5').update("".concat(Date.now(), "-").concat(Math.random())).digest("hex")
    const webvalue="{\"recaptcha_site_key\":\"6LcFsyEgAAAAALHyIu0-m6uiwFpZitTPqaJcv5zD\",\"recaptcha_token\":\""+req.body.recaptchatoken+"\",\"recaptcha_action\":\"verify_code_signin\"}"
    let web=crypto.createHash('md5').update(webvalue).digest("hex")
    value="POST/api/v1/verification/send/phone_s="+Date.now()+"&appName=portal-v5&appVer=6.0.2&deviceId="+req.body.deviceid+"&lang=en_US&platform=web&region=SGP&vendor=web"+web+"x-ca-key:WEB_APISIGNx-ca-nonce:"+nonce+"x-ca-timestamp:"+Date.now()
    let signature = crypto.createHmac('sha256', "QUWmBAYddriiHcKu").update(value).digest("base64");
    res.send( 
      {
        "nonce":nonce,
        "signature":signature
      } 
    )
  })
  app.post("/tiger/init",(req,res)=>{
    console.log(Date.now())
    date=Date.now()
    const dateminus=date-1;
    let nonce=crypto.createHash('md5').update("".concat(date, "-").concat(Math.random())).digest("hex")
    const webvalue="{\"grant_type\":\"phone\",\"username\":\""+req.body.phonenumber+"\",\"tel_code\":\"62\"}"
    let web=crypto.createHash('md5').update(webvalue).digest("hex")   
    // value="POST/api/v1/auth/route_s="+Date.now()+"&appName=portal-v5&appVer=6.0.2&deviceId=web-3aba9022-e69f-4c55-a4de-7fe2044&lang=en_US&platform=web&region=CHN&vendor=web"+web+"x-ca-key:WEB_APISIGNx-ca-nonce:"+nonce+"x-ca-timestamp:"+Date.now()
    // const value="POST/api/v1/auth/route_s=1668104842334&appName=portal-v5&appVer=6.0.2&deviceId=web-3aba9022-e69f-4c55-a4de-7fe2044&lang=en_US&platform=web&region=CHN&vendor=web5621dca4957326895556afddbf1c3fa5x-ca-key:WEB_APISIGNx-ca-nonce:aeb60e0971c77731f89ddcdfc09634a5x-ca-timestamp:1668104842340"
    const value="POST\n/api/v1/auth/route\n_s="+dateminus+"&appName=portal-v5&appVer=6.0.2&deviceId="+req.body.deviceid+"&lang=en_US&platform=web&region=CHN&vendor=web\n"+web+"\nx-ca-key:WEB_APISIGN\nx-ca-nonce:"+nonce+"\nx-ca-timestamp:"+Date.now()
    let signature = crypto.createHmac('sha256', "QUWmBAYddriiHcKu").update(value).digest("base64");
    res.send( 
      {
        "nonce":nonce,
        "signature":signature
      } 
    )
  })
  app.post("/alpari",(req,res)=>{
    let hash=crypto.createHash('md5').update(req.body.phone+"oawF_3TRKmpkJx4QKarJT6a5bM3bvgyD2Aqnb4G1cn0").digest("hex") 
    let key ="_"+hash.slice(0, 5)+hash.slice(hash.length - 7);
    res.send({
      "hash":hash,
      "key":key
    })
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

app.post("/mexc",(req,res)=>{
  L=290
  // P = Date.now() + L

  P=1668763039523
  let mxckey=crypto.createHash('md5').update(""+P).digest("hex") 
  let webkey=crypto.createHash('md5').update("0"+""+P).digest("hex")
  websignkey=webkey.substring(7)
  mxcsignkey=mxckey.substring(7)
  console.log(websignkey)
  console.log(mxcsignkey)

  let websignencryption=crypto.createHash('md5').update(P+"captcha_id="+req.body.captcha_id+"&captcha_output="+req.body.captcha_output+"=&country=93&gen_time="+req.body.gen_time+"&lot_number="+req.body.lot_number+"&mobile="+req.body.mobile+"&pass_token="+req.body.pass_token+"&type=REGISTER"+websignkey).digest("hex") 
  console.log(P+"captcha_id="+req.body.captcha_id+"&"+req.body.captcha_output+"=&country=93&gen_time="+req.body.gen_time+"&lot_number="+req.body.lot_number+"&mobile="+req.body.mobile+"&pass_token="+req.body.pass_token+"&type=REGISTER"+websignkey)
  let mxcsignencryption=crypto.createHash('md5').update(P+"captcha_id="+req.body.captcha_id+"&captcha_output="+req.body.captcha_output+"%3D&country=93&gen_time="+req.body.gen_time+"&lot_number="+req.body.lot_number+"&mobile="+req.body.mobile+"&pass_token="+req.body.pass_token+"&type=REGISTER"+mxcsignkey).digest("hex") 
  console.log("..........................")
  console.log(P+"captcha_id="+req.body.captcha_id+"&captcha_output="+req.body.captcha_output+"%3D&country=93&gen_time="+req.body.gen_time+"&lot_number="+req.body.lot_number+"&mobile="+req.body.mobile+"&pass_token="+req.body.pass_token+"&type=REGISTER"+mxcsignkey)
  // let test=crypto.createHash('md5').update("1668414818489captcha_id=a563fcff60a7c7dce79b3fd5dba4316c&captcha_output=w1BvJD7a8fHPcU_IVsAW7puW5t1fnEcs7ZZFDxuZd3Vc11OKRCTRu6E8MaqQv_Uc9VLalpGeVjbxi-OBxRI_Du2nEV-UwCjy0C1gjr76Ol46d7gwQbeh2GimVD-ygv3NTGnYX6NDaceVdQiTDk_0c74r-FJ_oP-zWdqIrVPSi4TF9eTEfGDEuLJf2CGnzjfcJ-dqChyPYE_hRtkma3esHx96XsbQLx2p60OjZO_O8Wk%3D&country=93&gen_time=1668414809&lot_number=8dd2ace658ed41a88bf456d7fdf82f83&mobile=741786544&pass_token=b577df9237a3284fdf894fccfd77ce7ab77b507c7a13e88baefd3b6cb52f5ba9&type=REGISTERccfc943c008b1830a791335d4").digest("hex") 

  res.send({
    "websignencryption":websignencryption,
    "mxcsignencryption":mxcsignencryption,
    "time":P
  })
})


app.post("/sentbe",(req,res)=>{
  console.log(req.body)
  var data = CryptoJS.AES.encrypt(JSON.stringify(req.body), "cXdqZmlvcWVqd2xd2pmam9pZaG9nZnFl").toString();
  res.send({
    "data":data,

  })
})


"1668763039523captcha_id=a563fcff60a7c7dce79b3fd5dba4316c&captcha_output=w1BvJD7a8fHPcU_IVsAW7puW5t1fnEcs7ZZFDxuZd3Vc11OKRCTRu6E8MaqQv_UcnOCmH-PD4r27kJfk15I44uXooylsJtsb7Lve--Oc-GHxv8RQm57RLlgGlJmyTrOq3uc1wu1Ki-dHZyl5Shvz6jNdLLaJSbpz9In6hfb-6TsGEzDdazPB9SWKDXmbwlyL5r6oLZ2rzJwfQW3huRz9227sJR4dc4cvKZMNsO4dzY0%3D&country=93&gen_time=1668763012&lot_number=62b8c6b062254645bade3cdfc8828efe&mobile=741797549&pass_token=afbabe7c57236a95806b6f575bf1e0efa11b67a8bd81c7b93ca501bf32bef671&type=REGISTER7cc238a4c148ab1f431999f94"
// {
//   "segment_info": true,
//   "group_info": false
// }
// {
//   "first_name": "sdsdaas",
//   "last_name": "dsaassa",
//   "email": "dsxaxs@Wdsds.com",
//   "phone": "628818391831",
//   "password": "Zmamhmh.1@",
//   "confirm_password": "Zmamhmh.1@",
//   "is_unsubscribed": true,
//   "captcha": "03AEkXODBZ5EkDDybrvDmIsusofb2EkTaJPSEDbVX58RQlcXxfSeyFlew5UF-cHJmdp13MiChdvNDdA92EbFNhAES6MJrbKRUbBcLn44ilSvyXm5VPXx7_OcsP2CxgBcBXDEKFrPCkTVNeSWlrb13TDscIvFHDj30OxlC25gCUZF2Bz0hQwLGtc_TSviSjTdtOE5Z6od-0RSAIKHCbqobHIo84MAFGc9YCceXaW0KegJW3LcO3uC4qrIiMsy1h69KltgoZPL4-cfzoCIPZ-ED_kMCE2O3_EjAmg1p1Vy1c5byX3JY6PHhHNZMpa7ujBY2sbLY-LvOvpMvZZlNXT38VChCXJ2GAceR400B1suFMX8G97SI6ThXSSUNUxyzN9Fd1s0jS-BM2EMLmoRPnfUjWiuSqp9BcexiB2UTuuxEOm882D3TIbP0aeehWeYJaEa5As1lauxLGViqr0-u1gly5jOzw4zrFwUno6D7wcO-UAjHIIpBmb_LDb96yhP-79-3v3blDPlkcq8XL",
//   "version": "v3",
//   "source": "LoginActivity"
// }