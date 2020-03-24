const express = require('express');
const router = express.Router();
const conn = require('../db/conn');
const bcrypt = require('bcrypt');
const saltRounds = 10;
nodemailer = require('nodemailer');

router.get('/', (req, res, next) => {
    res.send('Server hit')
})

router.route('/createUser').post((req, res, next) => { 

    var email = req.body.email.toLowerCase()
    var userName = req.body.userName
    var pwd = req.body.pwd
    var isEmployer = req.body.isEmployer
    var isCompany = 0

    if(req.body.isCompany) {
        isCompany = req.body.isCompany
    }

    bcrypt.hash(pwd, saltRounds, function(error, hash) {
        console.log(pwd) 
        if(error) { 
            res.send(error)
        }
        else { 
            console.log(hash)
            pwd = hash
            var sql = 'insert into users(email, userName, pwd, isEmployer, isCompany) values("'+email+'", "'+userName+'", "'+pwd+'", '+isEmployer+', '+isCompany+')'
            console.log(sql)
            conn.query(sql, (error, result) => {
                if(error) {
                    res.send(error)
                }
                else {
                    res.json(result)
                }
            })
        }
    })
})

router.route('/applyForJob').post((req, res, next) => {
    var empId = req.body.applicantId
    var jobId = req.body.jobId
    var sql = 'insert into applications(applicantId, jobId) values('+empId+', '+jobId+')'
    conn.query(sql, (err, result) => {
        if(err) {
            res.send(err)
        }
        else {
            conn.query('select * from postedJobs where id = ' + jobId, (error, data) => {
                if(error) {
                    res.send(error)
                }
                else {
                    res.json(data)
                }
            })
        }
    })
})

router.route('/addNotify').post((req, res, next) => {
    var sql = 'insert into notifications(toUserId, msg) values("'+req.body.toUserId+'", "'+req.body.msg+'")'
    console.log(sql)
    conn.query(sql, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.route('/getNotifications/:id').get((req, res, next) => { 
    var sql = 'select * from notifications where toUserId = ' + req.params.id;
    conn.query(sql, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.route('/shortlist').post((req, res, next) => { 
    var sql = 'update applications set isShortlisted = ' + req.body.isShortlisted + ' where id = ' + req.body.id;
    conn.query(sql, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.route('/postJob').post((req, res, next) => { 
    
    var userId = req.body.userId
    var description = req.body.description
    var position = req.body.position
    var salary = req.body.salary
    var city = req.body.city
    var state = req.body.state
    var country = req.body.country
    var postalCode = req.body.postalCode

    var sql = 'insert into postedJobs(userId, description, position, salary, city, country, state, postalCode) values("'+userId+'", "'+description+'", "'+position+'", "'+salary+'", "'+city+'", "'+country+'", "'+state+'", "'+postalCode+'")'
    console.log(sql)
    conn.query(sql, (error, result) => { 
        if(error) {
            res.send(error)
        }
        else {
            res.json(result)
        }
    })
})

router.route('/login').post((req, res) => { 
    var email = req.body.email.toLowerCase()
    var pwd = req.body.pwd

    var sql = 'select * from users where email = "'+email+'"'
    console.log(sql)

    conn.query(sql, (error, users) => {
        console.log(users)
        if(error) {
            res.send(error)
        }
        else {
            bcrypt.compare(pwd, users[0].pwd, function(err, data) { 
                if(data) { 
                    res.json(users[0])
                }
                else {
                    res.send(err)
                }
            })
        }
    })
})

router.route('/getAllPostedJobs/:id').get((req, res, next) => {
    var userId = req.params.id
    /* var sql = 'select postedOn, position, description, j.id jobId, count(a.applicantId) applicants from postedJobs j left join applications a on j.id = a.jobId where userId = '+userId+' and isClosed = 0 group by a.applicantId order by postedOn desc' */
    var sql = 'select postedOn, position, description, j.id jobId, count(a.applicantId) applicants from postedJobs j left join applications a on j.id = a.jobId where userId = '+userId+' and isClosed = 0 group by jobId order by postedOn desc'
    conn.query(sql, (err, jobs) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(jobs)
        }
    })
})

router.route('/getAllJobs/:id').get((req, res, next) => {
    var empId = req.params.id
    var sql = 'select *, p.id jobId from postedJobs p inner join users u on p.userId = u.id                 and isClosed = 0 where p.id not in (select jobId from applications a where                  applicantId = '+empId+') order by postedOn desc'
    conn.query(sql, (err, jobs) => { 
        if(err) {
            res.send(err)
        }
        else {
            res.json(jobs)
        }
    })
})

router.route('/getAppliedJobs/:id').get((req, res, next) => {
    var empId = req.params.id
    var sql = 'select *, p.id jobId from postedJobs p inner join users u on p.userId = u.id                 and isClosed = 0 where p.id in (select jobId from applications a where                  applicantId = '+empId+') order by postedOn desc'
    conn.query(sql, (err, jobs) => { 
        if(err) {
            res.send(err)
        }
        else {
            res.json(jobs)
        }
    })
})

router.route('/getPostedJobDetails/:id').get((req, res, next) => {
    var sql = 'SELECT *, a.id aId FROM postedJobs j left join applications a on j.id = a.jobId left join users u on a.applicantId = u.id where j.id = ' + req.params.id
    conn.query(sql, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.route('/getEmpJobDetails/:id').get((req, res, next) => {
    var sql = 'SELECT * FROM postedJobs j inner join users u on j.userId = u.id where j.id = ' + req.params.id
    conn.query(sql, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.route('/getProfile/:id').get((req, res, next) => {
    var sql = 'SELECT * FROM users u left join exp e on u.id=e.userId where u.id = ' + req.params.id + ' order by e.creationTime desc'
    conn.query(sql, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.route('/saveProfile').post((req, res, next) => { 
    console.log(req.body.imageSrc)
    var sql = 'update users set profilePic = "' + req.body.imageSrc + '" where id = ' + req.body.userId
    console.log(sql)
    conn.query(sql, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.route('/saveResume').post((req, res, next) => { 
    //console.log(req.body.imageSrc)
    var sql = 'update users set resume = "' + req.body.resume + '" where id = ' + req.body.userId
    //console.log(sql)
    conn.query(sql, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.route('/editProfile').post((req, res, next) => { 
    var sql = 'update users set userName = "' + req.body.userName + '", location = "' + req.body.location + '" where id = ' + req.body.userId
    //console.log(sql)
    conn.query(sql, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.route('/addExp').post((req, res, next) => {
    var sql = "insert into exp(userId, company, position, description, fromDate, toDate, stillWorking) values('"+req.body.userId+"', '"+req.body.company+"', '"+req.body.position+"', '"+req.body.description+"', '"+req.body.from+"', '"+req.body.to+"', " + req.body.stillWorking + ")"
    conn.query(sql, (error, result) => {
        if(error) {
            res.send(error)
        }
        else {
            res.json(result)
        }
    })
})

router.route('/sendEmail').post((req, res, next) => { 
    const sendMail = (req, callback) => {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "chandanabhargavmmm@gmail.com",
            pass: "abcABC123!@#"
          }
        }); 
        const mailOptions = {
          from: `"Teach Zone", "Teach Zone"`,
          to: `<${req.body.email}>`,
          subject: "Teach Zone",
          html: "Your OTP is 787686 to change your password"
          };
          
          transporter.sendMail(mailOptions, callback);
      }
      
      sendMail(req, (err, data) => {
        if(err)
            res.json(err);
        else
            res.json(data);
      });
})

module.exports = router