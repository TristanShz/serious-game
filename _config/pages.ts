export const pages = {
  register: {
    path: "/inscription",
    title: "MNG : Inscrivez vous !"
  },
  login: {
    path: "/connexion",
    title: "MNG : Connectez vous !"
  },
  monCompte: {
    path: "/mon-compte",
    title: "MNG : Votre compte !"
  },
  formations: {
    path: "/formations",
    title: "Formations en Informatique à Metz - Niveau bac à Bac+5 - Metz Numeric School"
  },
  formation: {
    path: (categoryAlias: string, formationAlias: string) => `/formations/${categoryAlias}/${formationAlias}`
  },
  category: {
    path: (alias: string) => `/formations/${alias}`
  },
  contact: {
    path: "/contact",
    name: "Besoin de renseignement ? Contactez nous"
  },
  quizzStartingPage: {
    path: (formationId: string) => `/quizz/${formationId}`,
    name: "Quizz"

  },
  quizz: {
    path: (formationId: string, quizzId: string) => `/quizz/${formationId}/${quizzId}`,
    name: "Quizz"

  }
};
