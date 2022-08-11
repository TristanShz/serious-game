import { withIronSessionApiRoute } from "iron-session/next";
import { apiConfig } from "../../../../_config/config";

export default withIronSessionApiRoute(function userRoute(req, res) {
    if (req.session.user) {
        res.json({ ...req.session.user });
    } else res.json({ isLoggedIn: false, email: "", firstName: "", lastName: "", role: "" });
}, apiConfig.ironOptions);
