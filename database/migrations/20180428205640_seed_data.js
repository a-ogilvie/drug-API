exports.up = function(knex, Promise) {
  const drugs = [
    {
      name: "acetaminophen",
      description:
        "Acetaminophen, also known as paracetamol, is commonly used for its analgesic and antipyretic effects. Its therapeutic effects are similar to salicylates, but it lacks anti-inflammatory, antiplatelet, and gastric ulcerative effects.",
      price: "2.77",
      stock: "534"
    },
    {
      name: "ibuprofen",
      description:
        "Ibuprofen, a propionic acid derivative, is a prototypical nonsteroidal anti-inflammatory agent (NSAIA) with analgesic and antipyretic properties.",
      price: "2.21",
      stock: "353"
    },
    {
      name: "acetylsalycylic acid",
      description:
        "The prototypical analgesic used in the treatment of mild to moderate pain. It has anti-inflammatory and antipyretic properties and acts as an inhibitor of cyclooxygenase which results in the inhibition of the biosynthesis of prostaglandins. Acetylsalicylic acid also inhibits platelet aggregation and is used in the prevention of arterial and venous thrombosis.",
      price: "0.09",
      stock: "6584"
    },
    {
      name: "codeine",
      description:
        "An opioid analgesic related to morphine but with less potent analgesic properties and mild sedative effects. It also acts centrally to suppress cough.",
      price: "9.87",
      stock: "244"
    },
    {
      name: "beclomethasone dipropionate",
      description:
        "Beclomethasone dipropionate is a prodrug of the free form, beclomethasone (beclomethasone-17-monopropionate). An anti-inflammatory, synthetic corticosteroid, it is used topically as an anti-inflammatory agent and in aerosol form for the treatment of asthma and allergic rhinitis (seasonal and perennial). Beclometasone dipropionate is also being investigated for oral treatment in mild-to-moderate Crohn's disease of ileal or ileal-right colonic localisation and for 'topical' use mild-to-moderate graft versus host disease. It is marketed under several brand names such as Qnasl (US) and Rivanase AQ (Canada).",
      price: "19.35",
      stock: "65"
    },
    {
      name: "amoxicillin",
      description:
        "A broad-spectrum semisynthetic antibiotic similar to ampicillin except that its resistance to gastric acid permits higher serum levels with oral administration. Amoxicillin is commonly prescribed with clauvanic acid (a beta lactamase inhibitor) as it is susceptible to beta-lacatamase degradation.",
      price: "12.99",
      stock: "155"
    },
    {
      name: "acyclovir",
      description:
        "A guanosine analog antiviral drug that acts as an antimetabolite. Aciclovir is used for the treatment of herpes simplex virus infections, varicella zoster (chickenpox) and herpes zoster (shingles). Aciclovir has also been investigated for the treatment of herpes labialis applied using an iontophoretic device. Currently approved drugs for the treatment of herpes labialis (cold sores) exhibit low levels of efficacy due to the limited ability of the drugs to penetrate the skin to the site where the herpes virus is replicating. Iontophoresis uses electric current to enhance the delivery of drugs through the skin.",
      price: "11.83",
      stock: "155"
    },
    {
      name: "warfarin",
      description:
        "Warfarin is an anticoagulant drug normally used to prevent blood clot formation as well as migration. Although originally marketed as a pesticide (d-Con, Rodex, among others), Warfarin has since become the most frequently prescribed oral anticoagulant in North America. Warfarin has several properties that should be noted when used medicinally, including its ability to cross the placental barrier during pregnancy which can result in fetal bleeding, spontaneous abortion, preterm birth, stillbirth, and neonatal death. Additional adverse effects such as necrosis, purple toe syndrome, osteoporosis, valve and artery calcification, and drug interactions have also been documented with warfarin use. Warfarin does not actually affect blood viscosity, rather, it inhibits vitamin-k dependent synthesis of biologically active forms of various clotting factors in addition to several regulatory factors.",
      price: "1.94",
      stock: "746"
    },
    {
      name: "sildenafil",
      description:
        "Sildenafil is a vasoactive agent used to treat erectile dysfunction and reduce symptoms in patients with pulmonary arterial hypertension (PAH). Sildenafil elevates levels of the second messenger, cGMP, by inhibiting its breakdown via phosphodiesterase type 5 (PDE5). PDE5 is found in particularly high concentrations in the corpus cavernosum, erectile tissue of the penis. It is also found in the retina and vascular endothelium. Increased cGMP results in vasodilation which facilitates generation and maintenance of an erection. The vasodilatory effects of sildenafil also help reduce symptoms of PAH.",
      price: "1.94",
      stock: "746"
    },
    {
      name: "phenylephrine",
      description:
        "Phenylephrine is a sympathomimetic amine that acts predominantly on α-adrenergic receptors. It is mainly used to treat nasal congestion, but may also be useful in treating hypotension and shock, hypotension during spinal anaesthesia, prolongation of spinal anaesthesia, paroxysmal supraventricular tachycardia, symptomatic relief of external or internal hemorrhoids, and to increase blood pressure as an aid in the diagnosis of heart murmurs.",
      price: "2.09",
      stock: "365"
    },
    {
      name: "nicotine",
      description:
        "Nicotine is highly toxic alkaloid. It is the prototypical agonist at nicotinic cholinergic receptors where it dramatically stimulates neurons and ultimately blocks synaptic transmission. Nicotine is also important medically because of its presence in tobacco smoke.",
      price: "5.37",
      stock: "25"
    }
  ];

  return knex("drug").insert(drugs);
};

exports.down = function(knex, Promise) {
  return knex("drug").del();
};
