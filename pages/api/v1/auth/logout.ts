import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { apiConfig } from "../../../../_config/config";

export default withIronSessionApiRoute(function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
    req.session.destroy();
    res.send({ ok: true });
}, apiConfig.ironOptions);
