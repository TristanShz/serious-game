import { withSessionRoute } from "../../../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import authService from "../../../../lib/users/auth/authService";
import { errorHandler } from "../../../../_common/_helpers/ctrlHelper";
import { errorsBuilders } from "../../../../_common/errors/errorBuilder";

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  try {
    const user = await authService.login(email, password);
    if (user && user._id) {
      req.session.user = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isLoggedIn: true
      };
    } else throw errorsBuilders.users.auth.unauthorized();
    await req.session.save();
    res.send({ user: req.session.user });
  } catch (error) {
    errorHandler(res, error, "auth" + ".signIn");
  }
}
