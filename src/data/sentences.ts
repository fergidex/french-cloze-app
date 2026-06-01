import type { Sentence } from "@/types";

export const sentences: Sentence[] = [
  // ─── SUBJONCTIF (12) ────────────────────────────────────────────────────────
  {
    id: 1,
    text: "Il faut que tu ___ tes devoirs avant de sortir ce soir.",
    answer: "finisses",
    level: "B1",
    category: "subjunctive",
    explanation:
      "'Il faut que' always triggers the subjunctive. 'Finir' → subjonctif présent tu: finisses. Regular -ir verbs in the subjunctive use the 3rd-person plural stem: finiss-.",
  },
  {
    id: 2,
    text: "Je veux que vous ___ à la réunion demain sans exception.",
    answer: "veniez",
    level: "B1",
    category: "subjunctive",
    explanation:
      "'Vouloir que' triggers the subjunctive. 'Venir' is irregular in the subjunctive: je vienne, tu viennes, il vienne, nous venions, vous veniez, ils viennent.",
  },
  {
    id: 3,
    text: "Bien qu'il ___ fatigué, il continue à travailler sans relâche.",
    answer: "soit",
    level: "B2",
    category: "subjunctive",
    explanation:
      "'Bien que' is a concessive conjunction that always requires the subjunctive. 'Être' is irregular: je sois, tu sois, il soit, nous soyons, vous soyez, ils soient.",
  },
  {
    id: 4,
    text: "Elle doute que son ami ___ vraiment l'aider dans cette situation.",
    answer: "puisse",
    level: "B2",
    category: "subjunctive",
    explanation:
      "'Douter que' triggers the subjunctive because it expresses doubt. 'Pouvoir' → subjunctive: je puisse, tu puisses, il puisse, nous puissions, vous puissiez, ils puissent.",
  },
  {
    id: 5,
    text: "Il est essentiel que nous ___ la vérité avant de prendre une décision.",
    answer: "sachions",
    level: "B2",
    category: "subjunctive",
    explanation:
      "Impersonal expressions of necessity ('il est essentiel que') require the subjunctive. 'Savoir' → subjunctive nous: sachions (irregular stem: sach-).",
  },
  {
    id: 6,
    text: "Pour que la réunion ___ productive, il faut bien se préparer.",
    answer: "soit",
    level: "B1",
    category: "subjunctive",
    explanation:
      "'Pour que' is a purpose conjunction that always requires the subjunctive. 'Être' → subjunctive il/elle: soit.",
  },
  {
    id: 7,
    text: "Je cherche quelqu'un qui ___ couramment le mandarin et le japonais.",
    answer: "parle",
    level: "B2",
    category: "subjunctive",
    explanation:
      "The subjunctive is used in relative clauses when the antecedent is indefinite or hypothetical ('quelqu'un qui…'). 'Parler' → subjunctive il/elle: parle (same as indicative for -er verbs, but triggered by context).",
  },
  {
    id: 8,
    text: "C'est la seule décision qui ___ vraiment du sens dans ce contexte.",
    answer: "ait",
    level: "B2",
    category: "subjunctive",
    explanation:
      "The subjunctive is used in relative clauses with superlatives or restrictive expressions ('le seul', 'le premier', 'l'unique'). 'Avoir' → subjunctive il/elle: ait.",
  },
  {
    id: 9,
    text: "Avant que tu ne ___, explique-moi exactement ce qui s'est passé.",
    answer: "partes",
    level: "B2",
    category: "subjunctive",
    explanation:
      "'Avant que' requires the subjunctive. 'Partir' → subjunctive tu: partes. Note the optional expletive 'ne' (ne explétif) after 'avant que' in formal registers.",
  },
  {
    id: 10,
    text: "Il est dommage que vous ___ raté ce spectacle extraordinaire.",
    answer: "ayez",
    level: "B2",
    category: "subjunctive",
    explanation:
      "'Il est dommage que' triggers the subjunctive. This is the subjonctif passé (perfect subjunctive): auxiliary in subjunctive + past participle. 'Avoir' → subjunctive vous: ayez (+ raté).",
  },
  {
    id: 11,
    text: "Quoiqu'elle ___ beaucoup travaillé, elle n'a pas obtenu le poste.",
    answer: "ait",
    level: "B2",
    category: "subjunctive",
    explanation:
      "'Quoique' (although) is a concessive conjunction requiring the subjunctive. This is the subjonctif passé: 'ait travaillé'. 'Avoir' → subjunctive il/elle: ait.",
  },
  {
    id: 12,
    text: "Il est peu probable qu'il ___ à l'heure pour la cérémonie officielle.",
    answer: "arrive",
    level: "B2",
    category: "subjunctive",
    explanation:
      "'Il est peu probable que' expresses strong doubt, triggering the subjunctive. 'Arriver' → subjunctive il/elle: arrive (same spelling as indicative for -er verbs, but the mode is different).",
  },

  // ─── CONDITIONNEL PRÉSENT (10) ───────────────────────────────────────────────
  {
    id: 13,
    text: "Si j'avais plus de temps, je ___ davantage à l'étranger.",
    answer: "voyagerais",
    level: "B1",
    category: "conditional_present",
    explanation:
      "Type-2 hypothetical si clause: si + imparfait → conditionnel présent. 'Voyager' → je voyagerais. Regular -er verb conditional: infinitive + -ais.",
  },
  {
    id: 14,
    text: "Il ___ vraiment s'installer à la campagne loin de l'agitation urbaine.",
    answer: "aimerait",
    level: "B1",
    category: "conditional_present",
    explanation:
      "The conditionnel présent expresses a wish or desire. 'Aimer' → il aimerait. Regular -er verbs: infinitive + -ait.",
  },
  {
    id: 15,
    text: "À ta place, je ne ___ pas cette décision aussi légèrement.",
    answer: "prendrais",
    level: "B1",
    category: "conditional_present",
    explanation:
      "'À ta place' signals advice expressed through the conditional. 'Prendre' is irregular: stem prendr- + -ais → prendrais. Other irregulars: faire→ferais, aller→irais.",
  },
  {
    id: 16,
    text: "Selon les médias, le ministre ___ une importante réforme fiscale.",
    answer: "envisagerait",
    level: "B2",
    category: "conditional_present",
    explanation:
      "The conditionnel journalistique: the conditional is used in French journalism to present unverified or reported information. 'Envisager' → il envisagerait.",
  },
  {
    id: 17,
    text: "Tu ___ vraiment consulter un spécialiste pour ce genre de problème.",
    answer: "devrais",
    level: "B1",
    category: "conditional_present",
    explanation:
      "'Devoir' in the conditional expresses advice or recommendation. Irregular stem: devr- + -ais → devrais. Compare: dois (present), devais (imparfait).",
  },
  {
    id: 18,
    text: "Ce ___ formidable si tu pouvais nous rejoindre pour le dîner.",
    answer: "serait",
    level: "B1",
    category: "conditional_present",
    explanation:
      "'Être' in the conditional expresses a hypothetical. Irregular stem: ser- + -ait → serait. This is the main clause of a type-2 si clause.",
  },
  {
    id: 19,
    text: "Nous ___ partir demain matin si tout le monde est d'accord.",
    answer: "pourrions",
    level: "B1",
    category: "conditional_present",
    explanation:
      "'Pouvoir' in the conditional expresses a polite suggestion or possibility. Irregular stem: pourr- + -ions → pourrions.",
  },
  {
    id: 20,
    text: "Il a déclaré qu'il ___ nous rendre visite pendant les vacances d'été.",
    answer: "viendrait",
    level: "B1",
    category: "conditional_present",
    explanation:
      "In reported speech after a past-tense verb ('a déclaré'), the future tense shifts to the conditionnel présent. 'Venir' irregular: viendr- + -ait → viendrait.",
  },
  {
    id: 21,
    text: "Sans ton aide précieuse, je ___ certainement une grave erreur.",
    answer: "ferais",
    level: "B1",
    category: "conditional_present",
    explanation:
      "'Faire' in the conditional for a counterfactual situation. Irregular stem: fer- + -ais → ferais. 'Sans' + noun often replaces a si clause.",
  },
  {
    id: 22,
    text: "Vous ___ peut-être avoir à rembourser les frais si le projet échoue.",
    answer: "pourriez",
    level: "B2",
    category: "conditional_present",
    explanation:
      "'Pouvoir' in the conditional: polite or hypothetical possibility. Irregular stem: pourr- + -iez → pourriez.",
  },

  // ─── CONDITIONNEL PASSÉ (8) ──────────────────────────────────────────────────
  {
    id: 23,
    text: "Si tu m'avais prévenu à temps, j'___ pu intervenir avant le problème.",
    answer: "aurais",
    level: "B2",
    category: "conditional_past",
    explanation:
      "Type-3 si clause (unreal past): si + plus-que-parfait → conditionnel passé. Conditionnel passé = avoir/être in conditional + past participle. 'Avoir' → j'aurais (+ pu).",
  },
  {
    id: 24,
    text: "Elle ___ venue à la soirée si elle n'avait pas été souffrante.",
    answer: "serait",
    level: "B2",
    category: "conditional_past",
    explanation:
      "Conditionnel passé with 'venir' (verb of movement using être as auxiliary). → elle serait venue. Note the agreement: venue (feminine).",
  },
  {
    id: 25,
    text: "Il ___ dû réfléchir davantage avant de prendre une telle décision.",
    answer: "aurait",
    level: "B2",
    category: "conditional_past",
    explanation:
      "'Devoir' in the conditionnel passé expresses a missed obligation or regret. 'Avoir' → il aurait (+ past participle dû).",
  },
  {
    id: 26,
    text: "Nous ___ préféré une solution moins coûteuse pour ce grand projet.",
    answer: "aurions",
    level: "B2",
    category: "conditional_past",
    explanation:
      "'Préférer' in conditionnel passé. Auxiliary 'avoir' → nous aurions (+ past participle préféré). Conditionnel passé = auxiliary in conditional + past participle.",
  },
  {
    id: 27,
    text: "Tu ___ adoré ce film, j'en suis absolument certain.",
    answer: "aurais",
    level: "B2",
    category: "conditional_past",
    explanation:
      "Conditionnel passé to speculate about what would have happened. 'Avoir' → tu aurais (+ adoré). This is used without an explicit si clause — the condition is implied.",
  },
  {
    id: 28,
    text: "Sans ton aide précieuse, je n'___ jamais réussi cet examen difficile.",
    answer: "aurais",
    level: "B2",
    category: "conditional_past",
    explanation:
      "Conditionnel passé in a negative counterfactual. 'Sans' replaces a si clause. 'Avoir' → je n'aurais jamais (+ réussi). Note the position of 'jamais' between auxiliary and participle.",
  },
  {
    id: 29,
    text: "Ils ___ pu éviter ce conflit s'ils avaient mieux communiqué dès le début.",
    answer: "auraient",
    level: "B2",
    category: "conditional_past",
    explanation:
      "Type-3 si clause. 'Pouvoir' in conditionnel passé. Auxiliary 'avoir' → ils auraient (+ past participle pu).",
  },
  {
    id: 30,
    text: "Elle m'a confié qu'elle ___ appelé si elle avait eu mon numéro.",
    answer: "aurait",
    level: "B2",
    category: "conditional_past",
    explanation:
      "Conditionnel passé in reported speech. The original statement was in conditionnel passé, which remains unchanged in indirect speech. 'Avoir' → elle aurait (+ appelé).",
  },

  // ─── IMPARFAIT (8) ───────────────────────────────────────────────────────────
  {
    id: 31,
    text: "Quand j'étais enfant, je ___ tous les jours dans le grand jardin.",
    answer: "jouais",
    level: "B1",
    category: "imparfait",
    explanation:
      "The imparfait describes habitual or repeated actions in the past ('used to'). 'Quand j'étais enfant' is a classic imparfait context. 'Jouer' → je jouais.",
    englishMeaning: "When I was a child, I used to play every day in the big garden.",
  },
  {
    id: 32,
    text: "Il ___ à verse lorsque nous sommes finalement arrivés à la gare.",
    answer: "pleuvait",
    level: "B1",
    category: "imparfait",
    explanation:
      "The imparfait describes a background condition (ongoing rain) while the passé composé marks the foreground event (we arrived). 'Pleuvoir' → il pleuvait.",
  },
  {
    id: 33,
    text: "Elle ___ tranquillement quand le téléphone a soudainement sonné.",
    answer: "lisait",
    level: "B1",
    category: "imparfait",
    explanation:
      "Imparfait for an ongoing action (reading) interrupted by a sudden event in passé composé (phone rang). 'Lire' → elle lisait. Note the irregular stem: lis- → lisait.",
    englishMeaning: "She was reading quietly when the phone suddenly rang.",
  },
  {
    id: 34,
    text: "Nous ___ à Lyon avant de déménager définitivement à Paris.",
    answer: "habitions",
    level: "B1",
    category: "imparfait",
    explanation:
      "The imparfait describes a past state or situation (where we used to live). 'Habiter' → nous habitions. Note the -i- before the -ons ending for the nous form.",
  },
  {
    id: 35,
    text: "Les enfants ___ paisiblement quand le tonnerre a brusquement retenti.",
    answer: "dormaient",
    level: "B1",
    category: "imparfait",
    explanation:
      "Imparfait for an ongoing background state (sleeping) interrupted by a sudden event (thunder, passé composé). 'Dormir' → ils dormaient.",
    englishMeaning: "The children were sleeping peacefully when the thunder suddenly rumbled.",
  },
  {
    id: 36,
    text: "Chaque été, toute la famille ___ se retrouver dans cette grande maison.",
    answer: "aimait",
    level: "B1",
    category: "imparfait",
    explanation:
      "Imparfait for repeated/habitual actions ('chaque été' is the key time marker). 'Aimer' → il/elle aimait. Regular -er verb: stem + -ait.",
    englishMeaning: "Every summer, the whole family loved to get together in that big house.",
  },
  {
    id: 37,
    text: "Quand elle était petite, elle ___ devenir pianiste de concert.",
    answer: "voulait",
    level: "B1",
    category: "imparfait",
    explanation:
      "Imparfait for a past wish, dream, or desire. 'Vouloir' is irregular in many tenses but regular in the imparfait: voul- + -ait → voulait.",
  },
  {
    id: 38,
    text: "Il ___ souvent à ses amis d'enfance qu'il avait perdus de vue.",
    answer: "pensait",
    level: "B1",
    category: "imparfait",
    explanation:
      "Imparfait for a repeated mental state or emotion. 'Penser' → il pensait. Mental/emotional verbs (croire, savoir, penser, vouloir) typically use the imparfait for background states.",
    englishMeaning: "He often thought about his childhood friends he had lost touch with.",
  },

  // ─── PASSÉ COMPOSÉ (7) ───────────────────────────────────────────────────────
  {
    id: 39,
    text: "Nous avons ___ dans un excellent restaurant du centre-ville hier soir.",
    answer: "dîné",
    level: "B1",
    category: "passe_compose",
    explanation:
      "Passé composé with 'avoir'. 'Dîner' → past participle dîné (regular -er verb: drop -er, add -é). No agreement with subject when using avoir.",
  },
  {
    id: 40,
    text: "Elle est ___ en France il y a exactement trois ans pour ses études.",
    answer: "arrivée",
    level: "B1",
    category: "passe_compose",
    explanation:
      "Passé composé with 'être' for verbs of movement and state change (the DR MRS VANDERTRAMP group). 'Arriver' → arrivée. Past participle agrees with the subject (elle → feminine → -e).",
  },
  {
    id: 41,
    text: "Ils ont ___ toutes leurs économies dans ce projet ambitieux et risqué.",
    answer: "investi",
    level: "B1",
    category: "passe_compose",
    explanation:
      "Passé composé with 'avoir'. 'Investir' → past participle investi (regular -ir verb: drop -ir, add -i). No agreement with subject when using avoir and the COD follows.",
  },
  {
    id: 42,
    text: "J'ai ___ une lettre très importante de mon notaire ce matin.",
    answer: "reçu",
    level: "B1",
    category: "passe_compose",
    explanation:
      "Passé composé with 'avoir'. 'Recevoir' → past participle reçu (irregular). Other irregular past participles: voir→vu, boire→bu, connaître→connu.",
    englishMeaning: "I received a very important letter from my notary this morning.",
  },
  {
    id: 43,
    text: "Elles se sont ___ après dix longues années de séparation involontaire.",
    answer: "retrouvées",
    level: "B2",
    category: "passe_compose",
    explanation:
      "Reflexive verbs use 'être' in passé composé. The past participle agrees with the reflexive pronoun when it is the direct object. 'Se retrouver' → retrouvées (feminine plural agreement with 'elles se').",
  },
  {
    id: 44,
    text: "Il a ___ son passeport quelque part dans la maison avant le voyage.",
    answer: "égaré",
    level: "B1",
    category: "passe_compose",
    explanation:
      "Passé composé with 'avoir'. 'Égarer' → past participle égaré (regular -er verb). No agreement because the COD 'son passeport' follows the verb.",
    englishMeaning: "He had misplaced his passport somewhere in the house before the trip.",
  },
  {
    id: 45,
    text: "La directrice a ___ tous les employés dans la grande salle de conférence.",
    answer: "convoqué",
    level: "B2",
    category: "passe_compose",
    explanation:
      "Passé composé with 'avoir'. 'Convoquer' → past participle convoqué (regular -er verb). No agreement with subject or with 'tous les employés' because the COD follows the auxiliary.",
  },

  // ─── IMPARFAIT VS PASSÉ COMPOSÉ (10) ────────────────────────────────────────
  {
    id: 46,
    text: "Il ___ profondément quand je suis arrivé à son appartement ce matin.",
    answer: "dormait",
    level: "B1",
    category: "imparfait_passe_compose",
    explanation:
      "Background state (imparfait: was sleeping) vs. foreground event (passé composé: I arrived). The sleeping was already in progress when the arrival occurred. 'Dormir' → il dormait.",
  },
  {
    id: 47,
    text: "Pendant qu'elle ___ au bureau, son mari préparait tranquillement le dîner.",
    answer: "travaillait",
    level: "B1",
    category: "imparfait_passe_compose",
    explanation:
      "'Pendant que' signals two simultaneous ongoing actions, both requiring the imparfait. 'Travailler' → elle travaillait. Both actions were in progress at the same time.",
  },
  {
    id: 48,
    text: "Nous ___ dans la forêt quand il a commencé à pleuvoir très fort.",
    answer: "marchions",
    level: "B1",
    category: "imparfait_passe_compose",
    explanation:
      "Ongoing background action (imparfait: we were walking) interrupted by a sudden event (passé composé: it started to rain). 'Marcher' → nous marchions.",
  },
  {
    id: 49,
    text: "J'___ de partir quand j'ai croisé mon ancien directeur dans le couloir.",
    answer: "allais",
    level: "B1",
    category: "imparfait_passe_compose",
    explanation:
      "'Aller + infinitive' in the imparfait expresses an action that was about to happen when it was interrupted. → j'allais (partir). The interruption is in passé composé: j'ai croisé.",
  },
  {
    id: 50,
    text: "Elle ___ très bien de la guitare jusqu'à l'âge de seize ans environ.",
    answer: "jouait",
    level: "B1",
    category: "imparfait_passe_compose",
    explanation:
      "The imparfait describes an extended past ability or state ('used to play well'). 'Jusqu'à l'âge de' marks a past duration, typical for imparfait. 'Jouer' → elle jouait.",
  },
  {
    id: 51,
    text: "Les touristes ___ la cathédrale pendant que nous attendions dehors.",
    answer: "visitaient",
    level: "B1",
    category: "imparfait_passe_compose",
    explanation:
      "Two simultaneous ongoing actions: both require the imparfait. 'Pendant que' + imparfait. 'Visiter' → ils visitaient. 'Attendre' → nous attendions.",
  },
  {
    id: 52,
    text: "Il ___ depuis deux heures quand l'orage a finalement éclaté au-dessus.",
    answer: "pleuvait",
    level: "B1",
    category: "imparfait_passe_compose",
    explanation:
      "Imparfait + 'depuis' for an ongoing action that had already started. Contrasted with the passé composé for the sudden completed event (l'orage a éclaté). 'Pleuvoir' → pleuvait.",
  },
  {
    id: 53,
    text: "Elle ___ sortir quand son téléphone a sonné une nouvelle fois.",
    answer: "allait",
    level: "B1",
    category: "imparfait_passe_compose",
    explanation:
      "'Aller + infinitive' in the imparfait: she was just about to leave (imminent action). The phone ringing (passé composé) interrupts the imminent action. → elle allait (sortir).",
  },
  {
    id: 54,
    text: "Ils ___ à la plage tous les étés quand leurs enfants étaient encore jeunes.",
    answer: "allaient",
    level: "B1",
    category: "imparfait_passe_compose",
    explanation:
      "Habitual past action (imparfait). 'Tous les étés' is the key marker for repeated/habitual actions → always imparfait, never passé composé. 'Aller' → ils allaient.",
  },
  {
    id: 55,
    text: "Le conférencier ___ depuis dix minutes quand le directeur est entré.",
    answer: "parlait",
    level: "B2",
    category: "imparfait_passe_compose",
    explanation:
      "Imparfait + 'depuis' for an action already in progress for a duration. The passé composé marks the interrupting event. 'Parler' → il parlait. This structure = was speaking (for 10 min) when he entered.",
  },

  // ─── PROPOSITIONS RELATIVES (10) ─────────────────────────────────────────────
  {
    id: 56,
    text: "C'est le film ___ a remporté la Palme d'Or à Cannes cette année.",
    answer: "qui",
    level: "B1",
    category: "relative_clauses",
    explanation:
      "'Qui' is the subject relative pronoun. It replaces the subject of the relative clause (le film a remporté → qui a remporté). Use 'qui' when the relative pronoun is the subject of its clause.",
  },
  {
    id: 57,
    text: "Voici le livre ___ je t'ai parlé avec tant d'enthousiasme la semaine dernière.",
    answer: "dont",
    level: "B1",
    category: "relative_clauses",
    explanation:
      "'Dont' replaces 'de + noun'. 'Parler de quelque chose' → dont. Je t'ai parlé de ce livre → le livre dont je t'ai parlé. Use 'dont' after verbs and expressions that take 'de'.",
  },
  {
    id: 58,
    text: "La ville ___ j'habite est célèbre pour ses musées et sa gastronomie.",
    answer: "où",
    level: "B1",
    category: "relative_clauses",
    explanation:
      "'Où' is the relative pronoun for places (and sometimes times). It replaces 'dans cette ville'. J'habite dans cette ville → la ville où j'habite. 'Où' can replace 'dans lequel/laquelle'.",
  },
  {
    id: 59,
    text: "L'actrice ___ nous avons rencontrée hier soir était particulièrement sympathique.",
    answer: "que",
    level: "B1",
    category: "relative_clauses",
    explanation:
      "'Que' is the direct object relative pronoun. Nous avons rencontré l'actrice → l'actrice que nous avons rencontrée. Since the COD (que = l'actrice) precedes 'avoir', the past participle agrees: rencontrée (feminine).",
  },
  {
    id: 60,
    text: "Le problème ___ il s'agit dans ce rapport est particulièrement délicat.",
    answer: "dont",
    level: "B2",
    category: "relative_clauses",
    explanation:
      "'Dont' replaces 'de + noun'. 'S'agir de' → dont. Il s'agit de ce problème → le problème dont il s'agit. This is a more formal use of 'dont' with an impersonal expression.",
  },
  {
    id: 61,
    text: "L'époque ___ les voyages étaient beaucoup plus lents est bien révolue.",
    answer: "où",
    level: "B1",
    category: "relative_clauses",
    explanation:
      "'Où' can refer to time as well as place. It replaces 'à cette époque'. À cette époque les voyages étaient lents → l'époque où les voyages étaient lents.",
  },
  {
    id: 62,
    text: "Les étudiants ___ les travaux ont été primés sont extrêmement motivés.",
    answer: "dont",
    level: "B2",
    category: "relative_clauses",
    explanation:
      "Possessive 'dont': replaces 'leur(s)'. Leurs travaux ont été primés → dont les travaux ont été primés. 'Dont' always comes immediately after the antecedent; the rest of the clause follows in normal word order.",
  },
  {
    id: 63,
    text: "L'immeuble ___ mes parents habitaient pendant leur jeunesse a été démoli.",
    answer: "où",
    level: "B1",
    category: "relative_clauses",
    explanation:
      "'Où' replaces 'dans lequel' for places. 'Habiter dans cet immeuble' → l'immeuble où mes parents habitaient. 'Où' is simpler and more natural than 'dans lequel' in conversation.",
  },
  {
    id: 64,
    text: "Ce sont des conclusions ___ je ne suis absolument pas convaincu.",
    answer: "dont",
    level: "B2",
    category: "relative_clauses",
    explanation:
      "'Dont' after 'être convaincu de'. Je ne suis pas convaincu de ces conclusions → des conclusions dont je ne suis pas convaincu. Always use 'dont' (not 'que') after verbs that take 'de'.",
  },
  {
    id: 65,
    text: "La personne ___ tu m'as recommandé les services est vraiment compétente.",
    answer: "dont",
    level: "B2",
    category: "relative_clauses",
    explanation:
      "Possessive 'dont': tu m'as recommandé ses services → dont tu m'as recommandé les services. Note: after 'dont', the possessive adjective (ses/leur) is replaced by the definite article (les).",
  },

  // ─── FUTUR ANTÉRIEUR (7) ─────────────────────────────────────────────────────
  {
    id: 66,
    text: "Quand vous ___ terminé ce rapport détaillé, vous pourrez prendre congé.",
    answer: "aurez",
    level: "B2",
    category: "futur_anterieur",
    explanation:
      "After 'quand/lorsque', French uses the futur antérieur (not the present as in English) when the action will be completed before a future reference point. 'Avoir' → vous aurez (+ past participle terminé).",
  },
  {
    id: 67,
    text: "Elle ___ sans doute fini ses recherches avant la grande présentation.",
    answer: "aura",
    level: "B2",
    category: "futur_anterieur",
    explanation:
      "Futur antérieur expresses a future completed action or a supposition about a past event. 'Avoir' → elle aura (+ past participle fini). Formation: futur of avoir/être + past participle.",
  },
  {
    id: 68,
    text: "Dès qu'il ___ signé le contrat, nous pourrons enfin démarrer le projet.",
    answer: "aura",
    level: "B2",
    category: "futur_anterieur",
    explanation:
      "'Dès que' (as soon as) triggers the futur antérieur, not the present. This is a key difference from English. 'Avoir' → il aura (+ past participle signé).",
  },
  {
    id: 69,
    text: "Nous ___ dîné avant que vous n'arriviez chez nous, ne vous inquiétez pas.",
    answer: "aurons",
    level: "B2",
    category: "futur_anterieur",
    explanation:
      "Futur antérieur for a future action that will be completed before another future event. 'Avoir' → nous aurons (+ past participle dîné). Contrast with 'avant que' + subjunctive in the other clause.",
  },
  {
    id: 70,
    text: "Quand les travaux ___ pris fin, tout le quartier sera méconnaissable.",
    answer: "auront",
    level: "B2",
    category: "futur_anterieur",
    explanation:
      "'Quand' + futur antérieur for a completed future action. 'Avoir' → ils auront (+ past participle pris). 'Prendre fin' = to end/be completed.",
  },
  {
    id: 71,
    text: "Tu ___ terminé tes études bien avant que ton frère ne commence les siennes.",
    answer: "auras",
    level: "B2",
    category: "futur_anterieur",
    explanation:
      "Futur antérieur for a future completed action that precedes another. 'Avoir' → tu auras (+ past participle terminé). The other clause uses 'avant que' + subjunctive.",
  },
  {
    id: 72,
    text: "Une fois qu'il ___ résolu ce problème épineux, il pourra enfin se reposer.",
    answer: "aura",
    level: "B2",
    category: "futur_anterieur",
    explanation:
      "'Une fois que' (once) also triggers the futur antérieur in French. 'Avoir' → il aura (+ past participle résolu). 'Résoudre' has the irregular past participle: résolu.",
  },

  // ─── VOIX PASSIVE (7) ────────────────────────────────────────────────────────
  {
    id: 73,
    text: "Cette loi historique a ___ adoptée par le parlement à une large majorité.",
    answer: "été",
    level: "B2",
    category: "passive_voice",
    explanation:
      "Passive voice in passé composé: subject + avoir (conjugated) + été + past participle. The past participle 'adoptée' agrees with the subject 'loi' (feminine singular). Agent introduced by 'par'.",
  },
  {
    id: 74,
    text: "Ce célèbre tableau a ___ peint par un maître flamand du XVIIe siècle.",
    answer: "été",
    level: "B1",
    category: "passive_voice",
    explanation:
      "Passive voice: 'a été peint'. 'Être' in passé composé (a été) + past participle. 'Peint' agrees with 'tableau' (masculine singular) → no change. The agent is introduced by 'par'.",
  },
  {
    id: 75,
    text: "La réunion du comité a ___ annulée faute de participants disponibles.",
    answer: "été",
    level: "B2",
    category: "passive_voice",
    explanation:
      "Passive voice: 'a été annulée'. Agreement: réunion (feminine singular) → annulée. Note: 'faute de' = due to lack of. No agent expressed — the agent is unknown or unimportant.",
  },
  {
    id: 76,
    text: "Le rapport final ___ soumis au comité avant la fin du mois prochain.",
    answer: "sera",
    level: "B2",
    category: "passive_voice",
    explanation:
      "Passive voice in the future: 'sera + past participle'. 'Être' in futur simple → sera. 'Soumis' is the past participle of 'soumettre' (irregular: soumis). Agreement: rapport (masc. sing.) → soumis.",
  },
  {
    id: 77,
    text: "Le suspect a été ___ par la police lors d'un simple contrôle de routine.",
    answer: "interpellé",
    level: "B2",
    category: "passive_voice",
    explanation:
      "Passive voice: 'a été + past participle'. 'Interpeller' → past participle interpellé. Agreement with 'le suspect' (masculine singular) → interpellé (no change). Agent: par la police.",
  },
  {
    id: 78,
    text: "Le projet innovant sera ___ par une commission d'experts indépendants.",
    answer: "évalué",
    level: "B2",
    category: "passive_voice",
    explanation:
      "Passive voice with future: 'sera + past participle'. 'Évaluer' → past participle évalué. Agreement with 'projet' (masculine singular) → évalué (no change needed).",
  },
  {
    id: 79,
    text: "Les résultats complets ont ___ publiés plus tôt que prévu sur le site.",
    answer: "été",
    level: "B2",
    category: "passive_voice",
    explanation:
      "Passive voice in passé composé with plural subject: 'ont été + past participle'. 'Publié' agrees with 'les résultats' (masculine plural) → publiés. 'Ont' (plural) vs 'a' (singular) matches the plural subject.",
  },

  // ─── DISCOURS INDIRECT (6) ───────────────────────────────────────────────────
  {
    id: 80,
    text: "Il a dit qu'il ___ nous rendre visite la semaine suivante sans faute.",
    answer: "viendrait",
    level: "B2",
    category: "reported_speech",
    explanation:
      "In indirect speech after a past-tense reporting verb ('a dit'), the future shifts to the conditionnel présent. Direct: 'Je viendrai.' → Indirect: il a dit qu'il viendrait. 'Venir' → il viendrait.",
  },
  {
    id: 81,
    text: "Elle m'a demandé si j'___ du temps libre pendant ce week-end-là.",
    answer: "avais",
    level: "B2",
    category: "reported_speech",
    explanation:
      "In indirect speech after a past-tense verb ('a demandé'), the present shifts to the imparfait. Direct: 'As-tu du temps libre?' → Indirect: si j'avais du temps libre. 'Avoir' → j'avais.",
  },
  {
    id: 82,
    text: "Le directeur a annoncé qu'il ___ de nouvelles mesures dès le lundi suivant.",
    answer: "prendrait",
    level: "B2",
    category: "reported_speech",
    explanation:
      "In indirect speech, the future shifts to the conditionnel présent. Direct: 'Je prendrai de nouvelles mesures.' → Indirect: qu'il prendrait. 'Prendre' → il prendrait (irregular stem: prendrait).",
  },
  {
    id: 83,
    text: "Elle lui a demandé ce qu'il ___ de cette proposition très controversée.",
    answer: "pensait",
    level: "B2",
    category: "reported_speech",
    explanation:
      "In indirect speech, the present shifts to the imparfait. Direct: 'Que penses-tu de...?' → Indirect: ce qu'il pensait. Note: 'qu'est-ce que' becomes 'ce que' in indirect questions.",
  },
  {
    id: 84,
    text: "Il a expliqué que la réunion ___ lieu le lendemain à dix heures précises.",
    answer: "aurait",
    level: "B2",
    category: "reported_speech",
    explanation:
      "'Avoir lieu' (to take place) in the future shifts to conditionnel in indirect speech. Direct: 'La réunion aura lieu.' → Indirect: qu'elle aurait lieu. 'Avoir' → aurait.",
  },
  {
    id: 85,
    text: "Elle nous a confié qu'elle ___ obtenu une promotion tout à fait inespérée.",
    answer: "avait",
    level: "B2",
    category: "reported_speech",
    explanation:
      "In indirect speech, the passé composé shifts to the plus-que-parfait. Direct: 'J'ai obtenu une promotion.' → Indirect: qu'elle avait obtenu (plus-que-parfait = imparfait of avoir/être + past participle).",
  },

  // ─── GÉRONDIF (6) ────────────────────────────────────────────────────────────
  {
    id: 86,
    text: "Il a considérablement amélioré son niveau en ___ des podcasts chaque jour.",
    answer: "écoutant",
    level: "B2",
    category: "gerund",
    explanation:
      "The gérondif (en + present participle) expresses how or by what means something is done. 'Écouter' → present participle écoutant. Formation: nous form of présent minus -ons + -ant.",
  },
  {
    id: 87,
    text: "Elle a brillamment réussi son concours en ___ très régulièrement pendant un an.",
    answer: "travaillant",
    level: "B2",
    category: "gerund",
    explanation:
      "Gérondif for means or method. 'Travailler' → present participle travaillant. The gérondif subject must be the same as the main clause subject.",
    englishMeaning: "She brilliantly passed her exam by working very regularly for a year.",
  },
  {
    id: 88,
    text: "Tout en ___ ses études, il travaillait à mi-temps dans un café du quartier.",
    answer: "poursuivant",
    level: "B2",
    category: "gerund",
    explanation:
      "'Tout en + gérondif' emphasises simultaneous or contradictory actions. 'Poursuivre' → present participle poursuivant. 'Tout en' adds nuance: while at the same time / even while.",
  },
  {
    id: 89,
    text: "C'est en ___ qu'on devient forgeron, dit-on couramment en France.",
    answer: "forgeant",
    level: "B2",
    category: "gerund",
    explanation:
      "Famous French proverb ('practice makes perfect'): C'est en forgeant qu'on devient forgeron. 'Forger' → present participle forgeant. This structure 'C'est en + gérondif' is very common.",
  },
  {
    id: 90,
    text: "Il est tombé dans l'escalier en ___ beaucoup trop vite ce matin-là.",
    answer: "courant",
    level: "B2",
    category: "gerund",
    explanation:
      "Gérondif for simultaneous action or manner (he fell while running). 'Courir' → present participle courant (irregular: courons → cour + ant).",
  },
  {
    id: 91,
    text: "Elle chante toujours en ___ la vaisselle après le dîner en famille.",
    answer: "faisant",
    level: "B2",
    category: "gerund",
    explanation:
      "Gérondif with 'faire' for a simultaneous activity. 'Faire' → present participle faisant (irregular: faisons → fais + ant → faisant). One of the three irregular present participles in French.",
  },

  // ─── PROPOSITIONS EN SI (9) ──────────────────────────────────────────────────
  {
    id: 92,
    text: "Si j'___ plus d'argent de côté, je ferais un long voyage en Asie.",
    answer: "avais",
    level: "B1",
    category: "si_clauses",
    explanation:
      "Type-2 si clause (hypothetical present/future): si + imparfait, main clause + conditionnel présent. 'Si j'avais' (imparfait) → 'je ferais' (conditional). 'Avoir' → j'avais.",
  },
  {
    id: 93,
    text: "S'il ___ beau demain, nous pourrons faire un pique-nique au parc.",
    answer: "fait",
    level: "B1",
    category: "si_clauses",
    explanation:
      "Type-1 si clause (real possibility): si + présent, main clause + futur or présent. 'S'il fait beau' → présent (not future!). Never use the future or conditional directly after 'si'.",
  },
  {
    id: 94,
    text: "Si vous ___ parti plus tôt, vous n'auriez pas raté le dernier train.",
    answer: "étiez",
    level: "B2",
    category: "si_clauses",
    explanation:
      "Type-3 si clause (impossible past): si + plus-que-parfait, main clause + conditionnel passé. 'Partir' with 'être' → plus-que-parfait: vous étiez parti(s). Tests knowledge of être as auxiliary.",
  },
  {
    id: 95,
    text: "Si tu ___ là, je me sentirais tellement plus à l'aise et en sécurité.",
    answer: "étais",
    level: "B1",
    category: "si_clauses",
    explanation:
      "Type-2 si clause (hypothetical present): si + imparfait, main clause + conditionnel présent. 'Être' → tu étais (imparfait). The conditional 'je me sentirais' follows in the main clause.",
  },
  {
    id: 96,
    text: "Si seulement il ___ écouté mes conseils dès le tout début de l'affaire !",
    answer: "avait",
    level: "B2",
    category: "si_clauses",
    explanation:
      "Type-3 si clause expressing regret about the past: si + plus-que-parfait. 'Si seulement' + plus-que-parfait = if only he had... 'Avoir' → il avait (+ past participle écouté).",
  },
  {
    id: 97,
    text: "Si tu veux vraiment réussir, tu ___ t'entraîner sérieusement chaque jour.",
    answer: "dois",
    level: "B1",
    category: "si_clauses",
    explanation:
      "Type-1 si clause (real/general): si + présent, main clause + présent/futur/impératif. 'Si tu veux' (présent) → 'tu dois' (présent). 'Devoir' → tu dois.",
  },
  {
    id: 98,
    text: "Si elle ___ ce poste important, elle devrait déménager à Bruxelles.",
    answer: "obtenait",
    level: "B2",
    category: "si_clauses",
    explanation:
      "Type-2 si clause (hypothetical): si + imparfait, main clause + conditionnel présent. 'Obtenir' is a verb like 'venir': imparfait elle obtenait (stem: obten- + -ait).",
  },
  {
    id: 99,
    text: "Si j'avais su à l'avance, je n'___ jamais accepté cette mission impossible.",
    answer: "aurais",
    level: "B2",
    category: "si_clauses",
    explanation:
      "Type-3 si clause: 'si j'avais su' (plus-que-parfait), main clause + conditionnel passé. 'Avoir' → je n'aurais jamais (+ past participle accepté). Note: 'jamais' comes between auxiliary and participle.",
  },
  {
    id: 100,
    text: "Si vous ___ besoin d'aide à n'importe quel moment, n'hésitez pas à appeler.",
    answer: "avez",
    level: "B1",
    category: "si_clauses",
    explanation:
      "Type-1 si clause (open condition): si + présent, main clause + impératif. 'Avoir' → vous avez. The main clause uses the imperative: 'n'hésitez pas'. Never use future/conditional after 'si' in this type.",
  },
];
