const express = require("express");
const app = express();
const port = 1111;
const hbs = require("hbs");
const fs = require("fs");
const path = require("path");
const mongo = require('mongodb');
const otpGenerator = require('otp-generator')
var nodemailer = require('nodemailer');

const Host = require("./models/central");
const veri = require("./models/verify");
const { use } = require("express/lib/application");


const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "hbs");

app.set("views", template_path);
hbs.registerPartials(partials_path);
require("./db/connection");




app.get("/", (req, res) => {

    res.render("homepage");
});



app.get("/register", (req, res) => {

    res.render("register");
});

app.get("/searchVisitor", (req, res) => {

    res.render("searchVisitor");
});

app.post("/searchVisitor", async (req, res) => {

    try {

        const uotp = req.body.otp;

        visitorinfo = await Host.find({ otp: uotp });


        for (var i = 0; i < visitorinfo.length; i++) {

            const vname = (visitorinfo[i].vname);

            const vmobile = (visitorinfo[i].mobile);

            const vemail = (visitorinfo[i].email);

            const vadd = (visitorinfo[i].add);

            const pvisitdata = (visitorinfo[i].pvisit);

            const ptovdata = (visitorinfo[i].ptov);

            const vintime = (visitorinfo[i].intime);

            const vouttime = (visitorinfo[i].outtime);

            const vdate = (visitorinfo[i].date);

            res.render('visitorDeatils',
                {
                    name: vname,
                    vmobile: vmobile,
                    vemail: vemail,
                    vadd: vadd,
                    pvisitdata: pvisitdata,
                    ptovdata: ptovdata,
                    vintime: vintime,
                    vouttime: vouttime,
                    vdate: vdate
                });
        }

    }

    catch (e) {
        res.status(400).send("Connection not established");
    }
})



app.get("/visitorDeatils", (req, res) => {

    res.render("visitorDeatils");
});


app.get("/registerWelcome", (req, res) => {

    res.render("registerWelcome");
});


/*dont change the code from here */
app.post("/visitorDeatils",async (req, res) => {

    try{

        const verfriedData = new Host({
            status:req.body.status
})

           const usetable = await verfriedData.save();
           res.status(201).render("first");

    }catch(error){  
        res.status(400).send("Connection not established");
    }

})

/*dont change the code from here */

app.post("/register", async (req, res) => {

    var randomToken = require('random-token').create('0123456789');
    var OTP = randomToken(6);

    try {
        const home = new Host({
            vname: req.body.vname,
            mobile: req.body.mobile,
            email: req.body.email,
            add: req.body.add,
            pvisit: req.body.pvisit,
            ptov: req.body.ptov,
            intime: req.body.intime,
            outtime: req.body.outtime,
            date: req.body.date,
            otp: OTP,
        })
        const host = await home.save();
        res.status(201).render("homepage");

        const visitorEmail = (req.body.email);
        const visitorName = (req.body.vname);

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth: {
                user: 'shreyashmail@yahoo.com',
                pass: 'ahtzzhcvsibqokgo'
            }
        });

        var mailOptions = {
            from: 'shreyashmail@yahoo.com',
            to: visitorEmail,
            subject: 'Meeting details for your visit at Smartedge',
            text: `Hi ${visitorName}, your visit is registred sucessfully , please use the given OTP at gate to verify your identity : ` + OTP
            // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


    } catch (error) {
        res.status(400).send("Connection not established");
    }
    

})

app.listen(port, () => {

    console.log(`The connection is established on port ${port}`);

});



