const express = require("express");
const router = express.Router();

const heyCheckMeYourTax = async (req, res, next) => {
    const itIsMyTicket = req.body.ticket;
    if (itIsMyTicket === true) {
        next();
        return;
    } else {
        res.status(403).send("not valid");
        return;
    }
};

const getLink = (req, res, next) => {
    res.status(200).json({
        message: "success",
        data: ["links", "link"],
    });
};

router.get("/link", heyCheckMeYourTax, getLink);

module.exports = router;