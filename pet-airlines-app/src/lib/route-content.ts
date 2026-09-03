import { POPULAR_ROUTES } from './countries'

export interface RouteFaq {
  question: string
  answer: string
}

export interface RouteContentEntry {
  intro: string
  requirements: string[]
  timeline: string
  crateAndAirline: string
  costFactors: string
  faqs: RouteFaq[]
}

type RouteSlug = (typeof POPULAR_ROUTES)[number]['slug']

export const ROUTE_CONTENT = {
  'canada-to-vietnam': {
    intro:
      'Moving a pet from Canada to Vietnam is one of the more straightforward international relocations, since Vietnam does not require a rabies antibody titer test or a mandatory quarantine period for companion dogs and cats arriving with complete documentation. That said, the process still involves several coordinated steps on both ends: a Canadian export health certificate, an import permit from Vietnam, and careful attention to timing so nothing lapses between exams. Because Vietnam\'s import rules can shift with little public notice, we recommend confirming current requirements with the Department of Animal Health before booking travel dates, and we track this as part of every Canada-Vietnam booking we handle.',
    requirements: [
      'ISO-compliant microchip (11784/11785, 15-digit) implanted before or on the same day as the rabies vaccination — chipping after vaccination can invalidate it for entry purposes.',
      'Rabies vaccination administered at least 21-30 days before travel and still within its valid duration on arrival.',
      'Canadian export health certificate issued by a CFIA-accredited veterinarian, typically within 5-10 days of departure.',
      'Import permit from Vietnam\'s Department of Animal Health, arranged in advance — requirements and processing time can vary, so we confirm current guidance before each booking.',
      'Up-to-date general vaccinations (distemper, parvovirus, etc. for dogs; feline panleukopenia for cats) as recommended by your vet.',
    ],
    timeline:
      'Door-to-door timelines on this corridor typically run 3-6 weeks from first vet visit to arrival, driven mostly by the CFIA export certificate window and import permit processing rather than flight time itself. Pets who are already microchipped and current on rabies vaccination can sometimes move faster.',
    crateAndAirline:
      'Crates must meet IATA Live Animal Regulations (LAR) sizing — your pet needs to stand fully upright, turn around, and lie down without touching the crate walls. We size and, where needed, source an IATA-compliant crate as part of planning; airline and routing choice depends on your pet\'s size, breed, and current carrier policy at time of booking.',
    costFactors:
      'Cost on this route is driven by pet size and weight, crate requirements, documentation complexity, ground transport on both ends, and seasonal heat-embargo timing (many carriers restrict live-animal cargo during peak summer heat). We provide a route-specific quote after reviewing your pet\'s details.',
    faqs: [
      {
        question: 'Does Vietnam require a rabies titer test for pets arriving from Canada?',
        answer:
          'Typically no — Vietnam does not currently require the rabies antibody titer (FAVN) test that some other countries require, though rules can change, so we confirm current requirements before every booking.',
      },
      {
        question: 'Will my pet be quarantined on arrival in Vietnam?',
        answer:
          'Standard practice is no mandatory quarantine for pets arriving with complete, valid documentation, though this is always subject to current regulations at the time of travel.',
      },
      {
        question: 'How far in advance should I start the process?',
        answer:
          'We recommend starting 4-6 weeks before your target travel date to leave comfortable room for the CFIA export certificate and Vietnamese import permit.',
      },
    ],
  },
  'canada-to-south-korea': {
    intro:
      'South Korea maintains stricter entry rules than many destinations, and pets arriving from Canada typically need to satisfy the Animal and Plant Quarantine Agency\'s (APQA) requirements for countries not on its rabies-free or rabies-controlled list without additional testing. In practice this usually means a rabies antibody titer test (FAVN) is required, with a waiting period after the blood draw before travel is permitted — this is the step that most often catches owners off guard, since it must happen well before departure, not at the airport. We build every Canada-Korea plan around this titer timeline first, then work backward.',
    requirements: [
      'ISO-compliant microchip implanted before the rabies vaccination.',
      'Rabies vaccination, followed by a rabies neutralizing antibody titer (FAVN) test at an APQA-approved laboratory — this typically needs to be done at least several months before travel, so early planning matters.',
      'Canadian export health certificate from a CFIA-accredited veterinarian, issued close to the travel date.',
      'Advance notification/import quarantine inspection request to APQA before arrival, per current Korean requirements.',
      'General vaccination records current and available for review.',
    ],
    timeline:
      'This is typically the longest lead-time route in our network because of the rabies titer wait — plan for roughly 4-7 months from the initial rabies vaccination and titer draw to travel-ready status, though pets with existing valid titers may move faster. We recommend contacting us as early as possible if South Korea is your destination.',
    crateAndAirline:
      'IATA-compliant crate sizing applies, sized to your pet\'s measurements at the time of booking. Airline and routing selection depends on current carrier live-animal policies and availability on the Canada-Korea corridor.',
    costFactors:
      'Beyond standard factors (size, crate, documentation, ground transport), this route carries added laboratory and extended-timeline coordination costs from the titer test and the longer pre-travel window. We quote this route individually once we know your pet\'s current vaccination status.',
    faqs: [
      {
        question: 'Why does South Korea require a rabies titer test?',
        answer:
          'Because Canada is not on APQA\'s designated rabies-free/controlled list, pets typically need to demonstrate an adequate antibody response via a FAVN titer test rather than relying on vaccination alone.',
      },
      {
        question: 'How long is the titer wait before travel?',
        answer:
          'Requirements and wait periods are set by APQA and can change — we confirm the current waiting period before finalizing your travel date, and build it into the overall timeline from day one.',
      },
      {
        question: 'Can the titer test be skipped if my pet was already vaccinated?',
        answer:
          'A prior rabies vaccination alone typically isn\'t sufficient without the titer test unless your pet already has documented, valid titer results on file that meet current Korean requirements.',
      },
    ],
  },
  'south-korea-to-vietnam': {
    intro:
      'The Korea-Vietnam corridor is a shorter regional route with generally lighter import requirements on the Vietnam side than routes originating outside Asia, since Vietnam typically does not require a rabies titer test or standard quarantine. The main coordination point is obtaining Korean export paperwork and a valid Vietnamese import permit, plus making sure vaccination timing lines up cleanly with both countries\' rules.',
    requirements: [
      'ISO-compliant microchip implanted before the rabies vaccination.',
      'Rabies vaccination current and within its valid window at time of travel.',
      'Korean export health certificate from an accredited veterinarian, issued shortly before departure per Korean export rules.',
      'Import permit from Vietnam\'s Department of Animal Health, confirmed before booking flights.',
      'General vaccination records for dogs and cats as recommended by your vet.',
    ],
    timeline:
      'Typical door-to-door timelines run 2-4 weeks, largely governed by export certificate issuance windows and import permit processing rather than the relatively short flight itself.',
    crateAndAirline:
      'Standard IATA Live Animal Regulations crate sizing applies. Airline and routing on this shorter regional corridor is generally more flexible than long-haul routes, subject to current carrier live-animal policy.',
    costFactors:
      'Costs are driven primarily by pet size, crate needs, and ground transport/documentation handling on both ends; this is typically one of the more moderate routes in our network given the shorter distance and lighter import requirements.',
    faqs: [
      {
        question: 'Is a rabies titer test needed for this route?',
        answer:
          'Typically not for entry into Vietnam, though we always confirm current requirements before booking since rules can change without much notice.',
      },
      {
        question: 'How quickly can a Korea-Vietnam move be arranged?',
        answer:
          'This is one of our faster corridors — often 2-4 weeks once your pet\'s vaccination and microchip records are in order, though we recommend starting as early as possible.',
      },
      {
        question: 'Does my pet need to be quarantined in Vietnam?',
        answer:
          'Standard practice is no mandatory quarantine for pets arriving with complete, valid documentation, subject to current Vietnamese import rules at time of travel.',
      },
    ],
  },
  'canada-to-france': {
    intro:
      'Pets traveling from Canada into France (and the wider EU) move under the EU\'s non-commercial pet travel framework, which is well-documented but time-sensitive: the rabies vaccination must be at least 21 days old before entry, and the official EU health certificate is only valid for a limited window before travel, so timing has to be sequenced carefully rather than rushed at the last minute.',
    requirements: [
      'ISO-compliant microchip implanted before the rabies vaccination.',
      'Rabies vaccination administered at least 21 days before entry into the EU (this waiting period cannot be shortened).',
      'EU health certificate completed by a CFIA-accredited veterinarian within the validity window required for non-EU entry, then endorsed per current CFIA/EU procedure.',
      'General vaccination records current and available.',
      'Some entry points may request confirmation of tapeworm treatment for dogs depending on current French/EU guidance — we check this per booking since it varies by country and can change.',
    ],
    timeline:
      'Plan for a minimum of about 4-6 weeks, driven mainly by the mandatory 21-day post-rabies-vaccination wait plus certificate processing and endorsement time — pets already 21+ days past a valid rabies vaccination can move somewhat faster.',
    crateAndAirline:
      'IATA-compliant crate sizing applies. Small pets may qualify for in-cabin travel on some routes and airlines depending on current carrier policy and pet/crate weight limits; we advise on the best option once we know your pet\'s size and the carriers operating this route at time of booking.',
    costFactors:
      'Cost factors include pet size and weight, crate requirements, veterinary certificate/endorsement handling, and ground transport on both ends; cabin-eligible small pets are often more economical than larger pets requiring cargo transport.',
    faqs: [
      {
        question: 'Can the 21-day rabies wait before EU entry be shortened?',
        answer:
          'No — this is a fixed EU requirement for non-commercial pet movements from outside the EU and cannot be waived or expedited.',
      },
      {
        question: 'Do dogs need tapeworm treatment to enter France?',
        answer:
          'Requirements vary by country and can change, so we confirm current French/EU guidance for your specific travel dates before booking rather than assuming a blanket rule.',
      },
      {
        question: 'Can my pet fly in the cabin on this route?',
        answer:
          'Small pets may be eligible on some carriers, subject to current airline policy, pet/crate weight limits, and route — we check availability once we know your pet\'s size.',
      },
    ],
  },
  'south-korea-to-france': {
    intro:
      'This route combines South Korea\'s export requirements with the EU\'s standard non-commercial pet entry rules for France. Because Korea is not an EU-listed country, pets typically need a rabies vaccination followed by the mandatory 21-day wait before entry, along with an EU-format health certificate issued shortly before travel — we sequence the Korean export step and the EU certificate together so nothing expires before the other is ready.',
    requirements: [
      'ISO-compliant microchip implanted before the rabies vaccination.',
      'Rabies vaccination at least 21 days before entry into the EU.',
      'EU-format (or accepted equivalent) health certificate from an accredited Korean veterinarian, endorsed per current export procedure, valid within the required pre-travel window.',
      'Korean export clearance documentation as required for departure.',
      'Confirmation of any additional destination-specific treatment (such as tapeworm treatment for dogs) per current French/EU guidance at time of travel.',
    ],
    timeline:
      'Expect roughly 4-7 weeks door-to-door, driven by the 21-day post-vaccination wait plus Korean export documentation and certificate endorsement processing.',
    crateAndAirline:
      'IATA Live Animal Regulations crate sizing applies for cargo travel; cabin eligibility for small pets depends on current airline policy on this route. We confirm options once we know your pet\'s size and preferred travel window.',
    costFactors:
      'This is a longer-haul route, so cost is influenced by pet size, crate needs, veterinary certificate handling on the Korean side, and ground transport at both ends; we provide a specific quote after reviewing your pet\'s documentation status.',
    faqs: [
      {
        question: 'Does the rabies titer test required for South Korea entry also apply here?',
        answer:
          'The titer requirement applies to pets entering South Korea, not to pets departing it — for a Korea-to-France move, the relevant rule is the EU\'s 21-day post-vaccination wait rather than a titer test.',
      },
      {
        question: 'How early should I start planning a Korea-France move?',
        answer:
          'We recommend starting at least 6-8 weeks out to comfortably fit the rabies wait period and certificate processing without rushing.',
      },
      {
        question: 'Is quarantine required in France for pets from Korea?',
        answer:
          'Standard EU non-commercial pet entry does not require quarantine for pets with complete, compliant documentation, subject to current rules at time of travel.',
      },
    ],
  },
  'vietnam-to-france': {
    intro:
      'Moving a pet from Vietnam to France means meeting the EU\'s non-commercial entry requirements as a non-EU-listed origin, which centers on the same mandatory 21-day post-rabies-vaccination wait and EU-format health certificate used on other Asia-to-EU routes we handle, paired with Vietnamese export documentation on the departure side.',
    requirements: [
      'ISO-compliant microchip implanted before the rabies vaccination.',
      'Rabies vaccination at least 21 days before EU entry.',
      'EU-format health certificate completed and endorsed by an accredited Vietnamese veterinarian within the required pre-travel validity window.',
      'Vietnamese export clearance/documentation as required at time of departure.',
      'Confirmation of any additional destination-specific treatment requirements (such as tapeworm treatment for dogs) per current French/EU guidance.',
    ],
    timeline:
      'Typical door-to-door timelines run 4-6 weeks, primarily governed by the 21-day rabies wait and certificate endorsement processing on the Vietnamese side.',
    crateAndAirline:
      'IATA-compliant crate sizing applies for cargo travel. Cabin eligibility for small pets depends on current carrier policy on this long-haul route — we confirm options based on your pet\'s size and the operating airlines at time of booking.',
    costFactors:
      'As a long-haul route, cost reflects pet size and weight, crate needs, veterinary documentation handling, and ground transport at both ends; we quote this individually once we have your pet\'s current health and vaccination status.',
    faqs: [
      {
        question: 'Can the EU\'s 21-day rabies wait be shortened for this route?',
        answer:
          'No — it is a fixed requirement for non-commercial pet entry into the EU from a non-listed country and applies regardless of departure point.',
      },
      {
        question: 'Does Vietnam require anything special before export?',
        answer:
          'Export documentation requirements are set by Vietnamese authorities and can vary, so we confirm current requirements for your travel dates before booking rather than assuming they match import rules.',
      },
      {
        question: 'Is this route pet-size dependent for cabin travel?',
        answer:
          'Yes — cabin eligibility depends on your pet and crate meeting the operating airline\'s current weight and size limits, which we check once we know your pet\'s details.',
      },
    ],
  },
  'canada-to-united-states': {
    intro:
      'Canada-to-US pet moves are generally the simplest route in our network since both countries share extensive companion-animal trade and neither side currently requires quarantine or a rabies titer test for dogs and cats moving between them, though US federal rules for dog imports have tightened in recent years and now require an online CDC import form and proof of vaccination for many entries — we check the current CDC/APHIS requirements for every booking since they are updated periodically.',
    requirements: [
      'ISO-compliant microchip, recommended even where not strictly mandated, since it supports rabies vaccination verification.',
      'Rabies vaccination current and documented, with proof available at the border/port of entry per current CDC requirements for dogs.',
      'Completed CDC Dog Import Form (or current equivalent) submitted online before travel where applicable — requirements can change, so we confirm the current process for your travel date.',
      'General health certificate from a licensed veterinarian, typically issued close to the travel date.',
      'Cats generally face lighter federal requirements than dogs, though state-level rules can still apply depending on destination state.',
    ],
    timeline:
      'This is typically our fastest route — often 1-3 weeks door-to-door — since there is no mandatory rabies wait period or titer test for entry, and processing is mainly limited by vet appointment availability and certificate issuance.',
    crateAndAirline:
      'Standard IATA crate sizing applies for cargo or checked travel; many small pets qualify for in-cabin travel on domestic-style routings depending on current airline policy, which we confirm at time of booking.',
    costFactors:
      'Costs here are generally driven by pet size, ground transport distance on each end, and documentation handling rather than lengthy waiting-period logistics, making this typically one of our more economical long routes.',
    faqs: [
      {
        question: 'Do dogs need anything beyond a rabies vaccination to enter the US from Canada?',
        answer:
          'US requirements for dog imports have changed in recent years and can include an online CDC import form and additional documentation depending on your dog\'s vaccination history — we confirm the current process before every booking.',
      },
      {
        question: 'Is quarantine required entering the US from Canada?',
        answer:
          'No, standard practice does not require quarantine for pets with valid documentation, subject to current CDC/APHIS rules at time of travel.',
      },
      {
        question: 'How fast can this move happen?',
        answer:
          'This is typically our quickest international route — often just 1-3 weeks — since there\'s no rabies titer test or extended waiting period required.',
      },
    ],
  },
  'canada-to-australia': {
    intro:
      'Australia runs one of the strictest and longest pet import processes in the world, and pets from Canada should expect an extended pre-export timeline plus mandatory post-arrival quarantine at a government-approved facility. The Australian Department of Agriculture, Fisheries and Forestry (DAFF) requires a sequence of blood tests, waiting periods, and treatments before an import permit is granted, so this route needs to be planned many months ahead rather than weeks.',
    requirements: [
      'ISO-compliant microchip implanted before any rabies testing or treatments begin.',
      'Rabies vaccination followed by a rabies neutralizing antibody titer (RNATT) test, with a required waiting period after the blood draw before further steps can proceed — current DAFF timelines apply and we track these closely.',
      'Import permit from DAFF, applied for in advance and required before travel can be booked.',
      'Pre-export health checks, parasite treatments, and other tests as specified in the current DAFF conditions for pets from Canada\'s country group.',
      'Mandatory post-arrival quarantine at an approved facility (typically the Mickleham Post-Entry Quarantine facility near Melbourne) for a period set by DAFF at time of entry.',
    ],
    timeline:
      'This is the longest route we handle — realistically 6-9 months from the initial titer test to arrival, driven almost entirely by DAFF\'s pre-export waiting periods and quarantine facility booking, which fills up well in advance. We strongly recommend starting the process as early as possible if Australia is your destination.',
    crateAndAirline:
      'DAFF specifies its own crate and container standards for approved pet transport into Australia, which are stricter than general IATA sizing in some respects; we source and prepare a compliant crate as part of planning this route.',
    costFactors:
      'Costs on this route reflect the extended testing and quarantine timeline in addition to standard size/crate/transport factors, including quarantine facility fees, which are billed by the facility separately from our transport services and vary by length of stay.',
    faqs: [
      {
        question: 'Why does the Canada-Australia route take so much longer than others?',
        answer:
          'Australia requires a sequence of rabies titer testing, mandatory waiting periods, and additional treatments before DAFF will issue an import permit, plus mandatory post-arrival quarantine — this adds months compared to routes without titer or quarantine requirements.',
      },
      {
        question: 'Is quarantine really mandatory for every pet entering Australia?',
        answer:
          'Yes, under current DAFF rules pets from non-approved-country groups like Canada typically undergo a mandatory quarantine period at an approved facility on arrival, the length of which is set by DAFF at time of entry.',
      },
      {
        question: 'How far ahead should I start this process?',
        answer:
          'As early as possible — realistically 6-9 months before your target arrival date, since the titer test waiting period alone can take several months and quarantine facility space needs to be booked well ahead.',
      },
    ],
  },
} satisfies Record<RouteSlug, RouteContentEntry>
