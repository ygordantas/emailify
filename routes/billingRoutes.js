const { stripeSecretKey } = require("../config/keys");
const stripe = require("stripe")(stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    try {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: "cad",
        source: req.body.id,
        description: "Emailify charge"
      });
      if (charge.outcome.type === "authorized") {
        req.user.credits += parseInt(charge.amount) / 100;
        const user = await req.user.save();
        res.send(user);
      }
    } catch (err) {
      console.log(err);
    }
  });
};
