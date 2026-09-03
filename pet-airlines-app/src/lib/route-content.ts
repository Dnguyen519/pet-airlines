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
      'Moving a pet from Canada to Vietnam is one of the more straightforward international relocations, because Vietnam does not currently require a rabies antibody titer test or a mandatory quarantine period for companion dogs and cats that arrive with complete documentation. The process still involves several coordinated steps on both ends: a Canadian export health certificate endorsed on the departure side, an import permit issued on the Vietnamese side, and careful sequencing so that no document expires while another is still being processed. The order in which the microchip, the rabies vaccination and the health certificate happen matters more than the total elapsed time — a vaccination given before the microchip is implanted is commonly rejected, and a certificate issued too early can fall outside its validity window by the travel date. Vietnamese import rules can also change with limited public notice, so current requirements should be confirmed with the responsible authority before flights are booked rather than after.',
    requirements: [
      'ISO-compliant microchip (11784/11785, 15-digit) implanted before or on the same day as the rabies vaccination — chipping after vaccination can invalidate that vaccination for entry purposes.',
      'Rabies vaccination administered ahead of travel and still within its stated validity on the arrival date. A pre-travel interval after vaccination is commonly published as 21 to 30 days; confirm the current figure before booking.',
      'Canadian export health certificate issued by a CFIA-accredited veterinarian. The issuing window is typically published as a small number of days before departure, so the vet appointment has to be timed to the flight rather than booked early.',
      'Import permit issued by Vietnam\'s Department of Animal Health, arranged in advance. Processing times vary and are not fixed.',
      'General vaccinations current and documented (distemper and parvovirus for dogs, feline panleukopenia for cats) as advised by the attending veterinarian.',
      'Verify current rules: requirements and timings on this corridor are set by the Canadian Food Inspection Agency on the export side and Vietnam\'s Department of Animal Health on the import side. Confirm both against those authorities for your specific travel dates.',
    ],
    timeline:
      'Plan for roughly three to six weeks from the first veterinary appointment to arrival. That range is driven by the CFIA export certificate window and by import permit processing rather than by flight time, which is a single long-haul day. A pet that is already microchipped and current on rabies vaccination can sometimes move at the shorter end of that range; a pet that needs a first rabies vaccination cannot, because the post-vaccination interval has to elapse before departure. Treat any published range as planning guidance and confirm current processing times with CFIA and Vietnam\'s Department of Animal Health, since permit turnaround in particular is not guaranteed.',
    crateAndAirline:
      'Crates must meet IATA Live Animal Regulations sizing: the animal needs to stand fully upright, turn around, and lie down naturally without touching the sides or the roof. Sizing is taken from the pet\'s own measurements, not from breed averages, and your coordinator confirms the crate size before booking so the crate can be sourced and the pet acclimatised to it in advance. Airline and routing choice depends on the pet\'s size and breed, on snub-nosed breed restrictions where they apply, and on the live-animal policy each carrier is operating at the time of booking.',
    costFactors:
      'Cost on this corridor is driven by the pet\'s size and weight, the crate size that follows from it, documentation and permit handling, ground transport at both ends, and seasonal timing. Many carriers restrict live-animal cargo during peak summer heat, and an embargo that pushes travel into a different month can change both the routing and the price. A route-specific quote follows a review of the pet\'s details rather than a published flat rate.',
    faqs: [
      {
        question: 'Does Vietnam require a rabies titer test for pets arriving from Canada?',
        answer:
          'Not under the rules commonly published for this corridor — Vietnam does not currently require the rabies antibody titer (FAVN) test that some other destinations require. Rules change, so confirm the current position with Vietnam\'s Department of Animal Health before travel.',
      },
      {
        question: 'Will my pet be quarantined on arrival in Vietnam?',
        answer:
          'Pets arriving with complete, valid documentation are not commonly subject to a mandatory quarantine period on this corridor. This is always subject to the regulations in force on the arrival date, which the Department of Animal Health sets.',
      },
      {
        question: 'How far in advance should the process start?',
        answer:
          'Four to six weeks before the target travel date is a reasonable planning buffer, which leaves room for the CFIA export certificate window and for import permit processing without compressing either.',
      },
    ],
  },
  'canada-to-south-korea': {
    intro:
      'South Korea maintains stricter entry rules than many destinations. Pets 90 days of age or older arriving from countries that are not on the Animal and Plant Quarantine Agency\'s designated rabies-free or rabies-controlled list generally have to demonstrate an adequate antibody response rather than relying on a vaccination record alone, which in practice means a rabies vaccination followed, no sooner than 30 days later, by a rabies antibody titer test (FAVN) at an approved laboratory. A passing result is commonly published as valid for roughly 24 months from the draw date, and travel can proceed once that result is in hand rather than after a further wait. The step that most often catches owners out is treating the vaccination and the draw as things that can both happen close to departure — the minimum interval between them means the draw itself often has to happen months before the flight, and it cannot be resolved at the airport. Planning for this corridor is best done backwards from the titer draw: fix that date first, then place the export certificate, the arrival notification and the flight around it. The specifics are set by APQA and are subject to change.',
    requirements: [
      'ISO-compliant microchip implanted before the rabies vaccination, so that the vaccination and any subsequent test can be linked to the individual animal.',
      'Rabies vaccination followed, no sooner than 30 days later, by a rabies neutralizing antibody titer (FAVN) test at a laboratory APQA recognises. A passing result — commonly published as at least 0.5 IU/mL — is typically valid for roughly 24 months from the draw date, and travel can take place any time within that window; confirm the current minimum interval and validity period with APQA before fixing any dates. The requirement generally applies to dogs and cats 90 days of age or older arriving from a country not on APQA\'s designated list.',
      'Canadian export health certificate from a CFIA-accredited veterinarian, issued close to the travel date and within its published validity window.',
      'Advance notification to APQA and an import quarantine inspection request before arrival, per the procedure in force at the time of travel.',
      'General vaccination records current, legible and available for inspection on arrival.',
      'Verify current rules: this corridor is governed by the Canadian Food Inspection Agency on export and by Korea\'s Animal and Plant Quarantine Agency (APQA) on import. Confirm the titer draw\'s minimum post-vaccination interval, its result validity period, the approved laboratory list and the notification procedure against APQA for your travel dates.',
    ],
    timeline:
      'This corridor\'s lead time is set by the interval that has to elapse before the titer draw, not by a wait after it. Plan for roughly five to six weeks at minimum between the initial rabies vaccination and travel-ready status: the FAVN draw commonly cannot happen until at least 30 days after vaccination, and time then has to be allowed for the approved laboratory to process and report the result before the export certificate and flight are booked around it. A pet that already holds a valid, documented titer result — commonly published as good for roughly 24 months from the draw date — may be ready considerably sooner, since that step has already been served. Because the sequence is fixed — microchip, then vaccination, then a minimum interval, then the titer draw, then lab processing — the timeline cannot be compressed by starting the paperwork earlier, only by having already completed the earlier steps.',
    crateAndAirline:
      'IATA Live Animal Regulations crate sizing applies, taken from the pet\'s measurements at the time of booking rather than from a size chart. Airline and routing selection depends on the live-animal policies carriers are operating on the Canada-Korea corridor and on availability in the travel window, both of which change seasonally.',
    costFactors:
      'Beyond the usual factors of size, crate, documentation and ground transport, this corridor carries laboratory costs for the titer test and the coordination cost of a longer pre-travel window in which vaccinations and certificates have to be kept valid. A quote for this route follows a review of the pet\'s current vaccination and titer status, since a pet with an existing valid titer sits in a materially different position from one starting the sequence.',
    faqs: [
      {
        question: 'Why does South Korea require a rabies titer test for pets from Canada?',
        answer:
          'Because Canada is not on APQA\'s designated rabies-free or rabies-controlled list, pets generally have to demonstrate an adequate antibody response through a FAVN titer test rather than relying on the vaccination record alone. APQA maintains and updates that country designation.',
      },
      {
        question: 'How soon after vaccination can the titer test be drawn, and how long is the result good for?',
        answer:
          'The blood draw commonly cannot happen until at least 30 days after the rabies vaccination — it is a minimum interval that has to elapse before the draw, not a wait imposed after it. A passing result is then typically valid for roughly 24 months, and travel can take place at any point within that window. Confirm the current minimum interval and validity period with APQA before finalising a travel date, and build the interval into the plan from the first vet visit.',
      },
      {
        question: 'Can the titer test be skipped if the pet is already vaccinated?',
        answer:
          'A prior rabies vaccination on its own is not generally sufficient — the titer draw still has to follow it by the minimum interval APQA sets. An existing, documented titer result that is still within its roughly 24-month validity window and meets current Korean requirements can remove the need for a new draw, which is worth checking with APQA before restarting the sequence.',
      },
    ],
  },
  'south-korea-to-vietnam': {
    intro:
      'The Korea-Vietnam corridor is a shorter regional route with generally lighter import conditions than routes originating outside Asia, since Vietnam does not currently require a rabies titer test or a standard quarantine period for companion animals arriving with complete paperwork. The coordination points are on the documentation side rather than the testing side: Korean export paperwork has to be issued within its own validity window, a Vietnamese import permit has to be in hand before flights are committed, and the vaccination history has to satisfy both sets of rules at once. Because the flight itself is short, the timeline on this corridor is almost entirely a paperwork timeline, and the practical risk is a certificate issued too early rather than a missed waiting period. Both authorities can revise their requirements, so current guidance should be confirmed before booking.',
    requirements: [
      'ISO-compliant microchip implanted before the rabies vaccination.',
      'Rabies vaccination current and within its stated validity on the travel date.',
      'Korean export health certificate from an accredited veterinarian, issued shortly before departure in line with the export procedure in force.',
      'Import permit from Vietnam\'s Department of Animal Health, confirmed as issued before flights are booked rather than after.',
      'General vaccination records for dogs and cats as advised by the attending veterinarian, current and documented.',
      'Verify current rules: export conditions are set by Korea\'s Animal and Plant Quarantine Agency (APQA) and import conditions by Vietnam\'s Department of Animal Health. Confirm both for the intended travel dates.',
    ],
    timeline:
      'Plan for roughly two to four weeks door to door. That range is governed by export certificate issuance windows and by import permit processing rather than by the relatively short flight, and it assumes the microchip and rabies vaccination are already in place and correctly sequenced. Permit turnaround is not fixed, so confirm the current processing time with Vietnam\'s Department of Animal Health rather than treating the range as a commitment.',
    crateAndAirline:
      'Standard IATA Live Animal Regulations crate sizing applies, measured from the animal rather than estimated from breed. Airline and routing options on this shorter regional corridor are generally wider than on long-haul routes, but each carrier\'s live-animal policy and its seasonal embargoes still determine what is actually bookable in a given month.',
    costFactors:
      'Cost is driven primarily by the pet\'s size, the resulting crate size, and the handling of ground transport and documentation at both ends. The shorter sector distance and the lighter import conditions mean fewer cost variables than on long-haul corridors, though quarantine-free entry depends on the paperwork being complete rather than on the distance being short.',
    faqs: [
      {
        question: 'Is a rabies titer test needed for this route?',
        answer:
          'Not under the conditions Vietnam commonly publishes for companion animal imports. Confirm the current position with Vietnam\'s Department of Animal Health before booking, since these rules can change with limited notice.',
      },
      {
        question: 'How quickly can a Korea-Vietnam move be arranged?',
        answer:
          'Two to four weeks is a reasonable planning figure once the pet\'s vaccination and microchip records are in order and correctly sequenced. Starting earlier mainly buys room for permit processing, which is the least predictable step.',
      },
      {
        question: 'Does the pet need to be quarantined in Vietnam?',
        answer:
          'Pets arriving with complete, valid documentation are not commonly subject to a mandatory quarantine period, subject to the Vietnamese import rules in force on the arrival date.',
      },
    ],
  },
  'canada-to-france': {
    intro:
      'Pets travelling from Canada into France move under the European Union\'s non-commercial pet travel framework. That framework is unusually well documented compared with other destinations, which makes it predictable, but it is also strictly time-sequenced: the rabies vaccination has to be a set number of days old before entry, and the official health certificate is only valid for a limited window before travel. The consequence is that the two constraints pull in opposite directions — the vaccination has to be old enough, the certificate has to be recent enough — so the paperwork cannot simply be gathered early and held. The interval after rabies vaccination is commonly published as 21 days, and it cannot be shortened or waived for a non-EU origin. Confirm the current certificate validity window and any additional treatment requirements before fixing travel dates.',
    requirements: [
      'ISO-compliant microchip implanted before the rabies vaccination; a vaccination given to an unchipped animal generally has to be repeated after chipping.',
      'Rabies vaccination administered before entry into the EU, with a mandatory waiting period commonly published as 21 days that cannot be shortened.',
      'EU health certificate completed by a CFIA-accredited veterinarian and endorsed per the procedure in force, presented within its validity window for non-EU entry.',
      'General vaccination records current and available for inspection at the point of entry.',
      'Tapeworm treatment for dogs may be requested at some entry points depending on current French and EU guidance; this varies and should be checked per booking rather than assumed.',
      'Verify current rules: export certification is handled through the Canadian Food Inspection Agency, and entry conditions are set by French and EU authorities, with movements recorded through the EU TRACES system and national guidance published by ANSES. Confirm both sides for the intended travel dates.',
    ],
    timeline:
      'Plan for roughly four to six weeks at minimum. The driver is the mandatory post-vaccination waiting period, commonly published as 21 days, plus certificate completion and endorsement time on the Canadian side. A pet already past that interval on a valid rabies vaccination can move faster, since the remaining work is documentation rather than waiting. Confirm the current certificate validity window with CFIA before booking, because a certificate that expires in transit is the most common avoidable failure on this corridor.',
    crateAndAirline:
      'IATA Live Animal Regulations crate sizing applies for hold travel. Small pets may qualify for in-cabin carriage on some carriers and routings depending on the combined pet and carrier weight limit each airline sets, which differs between carriers and can change. The practical option depends on the pet\'s measured size and on which carriers are operating the route in the intended travel window.',
    costFactors:
      'Cost factors include the pet\'s size and weight, the crate that follows from it, veterinary certificate and endorsement handling, and ground transport at both ends. Cabin-eligible small pets are generally less expensive to move than pets that require hold transport, so the size threshold each carrier sets has a disproportionate effect on the total.',
    faqs: [
      {
        question: 'Can the rabies waiting period before EU entry be shortened?',
        answer:
          'No. The waiting period after rabies vaccination is a fixed requirement for non-commercial pet movements into the EU from outside it, commonly published as 21 days, and it cannot be waived or expedited.',
      },
      {
        question: 'Do dogs need tapeworm treatment to enter France?',
        answer:
          'It varies. Some EU member states apply a tapeworm treatment requirement and others do not, and guidance changes. Confirm the current French and EU position for the specific travel dates rather than assuming a blanket rule.',
      },
      {
        question: 'Can the pet fly in the cabin on this route?',
        answer:
          'Small pets may be eligible on some carriers. Eligibility depends on the airline\'s current policy, the combined pet and carrier weight limit, and the routing, so it has to be checked against the carriers actually operating the route.',
      },
    ],
  },
  'south-korea-to-france': {
    intro:
      'This corridor combines South Korea\'s export requirements with the European Union\'s standard non-commercial entry rules for France. Because Korea is not an EU-listed country for this purpose, pets generally need a rabies vaccination followed by the mandatory pre-entry waiting period, together with an EU-format health certificate issued shortly before travel. The two sides have to be sequenced against each other rather than handled in isolation: the Korean export step and the EU certificate each carry their own validity window, and the risk on a long-haul move is that one expires while the other is still being endorsed. The waiting period is commonly published as 21 days after vaccination and is not something the origin country can waive. Confirm the current certificate windows on both sides before committing to a travel date.',
    requirements: [
      'ISO-compliant microchip implanted before the rabies vaccination.',
      'Rabies vaccination given before EU entry, with the mandatory waiting period — commonly published as 21 days — fully elapsed on the arrival date.',
      'EU-format health certificate, or the accepted equivalent, from an accredited Korean veterinarian, endorsed per the export procedure in force and presented within its validity window.',
      'Korean export clearance documentation as required for departure.',
      'Confirmation of any destination-specific treatment, such as tapeworm treatment for dogs, per current French and EU guidance at the time of travel.',
      'Verify current rules: export conditions are set by Korea\'s Animal and Plant Quarantine Agency (APQA), and entry conditions by French and EU authorities, with movements recorded through the EU TRACES system and national guidance published by ANSES.',
    ],
    timeline:
      'Plan for roughly four to seven weeks door to door. The waiting period after rabies vaccination sets the floor, and Korean export documentation plus certificate endorsement processing account for most of the remainder. Because both the export paperwork and the EU certificate carry their own validity windows, the practical constraint is fitting them into the same window rather than the total elapsed time. Confirm the current windows with APQA and the French authorities before fixing dates.',
    crateAndAirline:
      'IATA Live Animal Regulations crate sizing applies for hold travel. Cabin eligibility for small pets depends on the operating carrier\'s current policy on this corridor and on the combined pet and carrier weight limit that carrier applies. The realistic options depend on the pet\'s measured size and the travel window.',
    costFactors:
      'This is a long-haul corridor, so cost reflects the pet\'s size and weight, the crate that follows from it, veterinary certificate handling on the Korean side, and ground transport at both ends. A quote follows a review of the pet\'s documentation status, since a pet whose vaccination interval has already elapsed sits in a different position from one starting the sequence.',
    faqs: [
      {
        question: 'Does the rabies titer test required for entry into South Korea also apply here?',
        answer:
          'No. The titer requirement applies to pets entering South Korea, not to pets departing it. For a Korea-to-France move the governing rule is the EU\'s post-vaccination waiting period rather than a titer test.',
      },
      {
        question: 'How early should planning start for a Korea-France move?',
        answer:
          'At least six to eight weeks before the target date is a reasonable buffer. That leaves room for the waiting period and for certificate endorsement without the two validity windows falling out of alignment.',
      },
      {
        question: 'Is quarantine required in France for pets arriving from Korea?',
        answer:
          'Standard EU non-commercial pet entry does not impose a quarantine period on pets with complete, compliant documentation. This is subject to the rules in force on the arrival date, which French and EU authorities set.',
      },
    ],
  },
  'vietnam-to-france': {
    intro:
      'Moving a pet from Vietnam to France means meeting the European Union\'s non-commercial entry requirements from a non-listed origin. In practice that is the same framework used on other Asia-to-EU corridors: a correctly sequenced microchip and rabies vaccination, the mandatory waiting period after vaccination commonly published as 21 days, and an EU-format health certificate issued and endorsed within its own validity window. The Vietnamese side adds export clearance documentation, which has its own processing time and is the less predictable half of the plan. As with every EU entry, the sequencing constraint is what matters: the vaccination has to be old enough while the certificate has to be recent enough, so the paperwork has to be timed to the flight rather than gathered in advance and held.',
    requirements: [
      'ISO-compliant microchip implanted before the rabies vaccination.',
      'Rabies vaccination given before EU entry, with the mandatory waiting period — commonly published as 21 days — fully elapsed on arrival.',
      'EU-format health certificate completed and endorsed by an accredited Vietnamese veterinarian within the required pre-travel validity window.',
      'Vietnamese export clearance documentation as required at the time of departure.',
      'Confirmation of any destination-specific treatment requirement, such as tapeworm treatment for dogs, per current French and EU guidance.',
      'Verify current rules: export conditions are set by Vietnam\'s Department of Animal Health, and entry conditions by French and EU authorities, with movements recorded through the EU TRACES system and national guidance published by ANSES.',
    ],
    timeline:
      'Plan for roughly four to six weeks door to door. The waiting period after rabies vaccination sets the floor and certificate endorsement processing on the Vietnamese side accounts for most of the variability. Export documentation timing in particular is not fixed, so confirm the current processing time with Vietnam\'s Department of Animal Health rather than working to a published range.',
    crateAndAirline:
      'IATA Live Animal Regulations crate sizing applies for hold travel, taken from the pet\'s own measurements. Cabin eligibility for small pets depends on the operating carrier\'s policy on this long-haul corridor and on the combined pet and carrier weight limit, both of which differ between airlines and can change between seasons.',
    costFactors:
      'As a long-haul corridor, cost reflects the pet\'s size and weight, crate requirements, veterinary documentation handling, and ground transport at both ends. A quote follows a review of the pet\'s current health and vaccination status rather than a published flat rate, since the documentation position materially changes the work involved.',
    faqs: [
      {
        question: 'Can the EU waiting period after rabies vaccination be shortened for this route?',
        answer:
          'No. It is a fixed requirement for non-commercial pet entry into the EU from a non-listed country and applies regardless of the departure point or the length of the flight.',
      },
      {
        question: 'Does Vietnam require anything specific before export?',
        answer:
          'Export documentation requirements are set by Vietnamese authorities and can differ from the import rules that apply to pets arriving in Vietnam. Confirm the current export requirements with the Department of Animal Health for the intended travel dates.',
      },
      {
        question: 'Is cabin travel possible on this route?',
        answer:
          'It depends on the pet and carrier together meeting the operating airline\'s current weight and size limits. Those limits vary by carrier and by aircraft, so eligibility has to be checked against the specific routing.',
      },
    ],
  },
  'canada-to-united-states': {
    intro:
      'Canada-to-US pet moves sit at the simpler end of international relocation. Neither side currently imposes a quarantine period or a rabies titer requirement for dogs and cats moving between the two countries, and the sector distance is short enough that routing is rarely the constraint. What has changed in recent years is the United States\' federal treatment of dog imports: the Centers for Disease Control and Prevention now applies a documented entry process for dogs, which commonly includes an online import form and proof of rabies vaccination, with the exact requirements depending on the dog\'s vaccination history and on where it has been in the preceding months. Those rules have been revised more than once, so the current CDC and APHIS conditions should be checked for the specific travel date rather than assumed from a previous move.',
    requirements: [
      'ISO-compliant microchip. Worth having even where it is not strictly mandated, because it is what links a rabies vaccination record to the individual animal at the border.',
      'Rabies vaccination current and documented, with proof available at the port of entry per the CDC requirements in force for dogs.',
      'The CDC dog import form, or its current equivalent, submitted online before travel where applicable. The form and the circumstances requiring it have changed more than once, so confirm the current process for the travel date.',
      'General health certificate from a licensed veterinarian, typically issued close to the travel date.',
      'Cats generally face lighter federal requirements than dogs, but state-level rules can still apply depending on the destination state and should be checked separately.',
      'Verify current rules: export certification is handled through the Canadian Food Inspection Agency, and entry conditions are set by the US Centers for Disease Control and Prevention (CDC) together with USDA APHIS. Confirm the dog import requirements against CDC for the intended travel date.',
    ],
    timeline:
      'This corridor generally moves faster than the others listed here, because there is no mandatory post-vaccination waiting period and no titer test to schedule around. Plan for roughly one to three weeks door to door; the limiting factors are veterinary appointment availability and health certificate issuance rather than any regulatory wait. Confirm the current CDC form processing expectation before booking, since a requirement that applies to a particular dog can add time the general case does not.',
    crateAndAirline:
      'Standard IATA Live Animal Regulations crate sizing applies for hold or checked travel. Many small pets qualify for in-cabin carriage on the shorter routings used on this corridor, depending on the carrier\'s current policy and its combined pet and carrier weight limit. Which option is actually available depends on the pet\'s measured size and the carriers serving the specific city pair.',
    costFactors:
      'Cost here is driven mainly by the pet\'s size, the ground transport distance at each end, and documentation handling, rather than by extended waiting-period logistics. Because there is no testing or quarantine component, the cost structure has fewer moving parts than the long-haul corridors listed on this site, though seasonal live-animal embargoes can still affect routing and price.',
    faqs: [
      {
        question: 'Do dogs need anything beyond a rabies vaccination to enter the US from Canada?',
        answer:
          'Often yes. US requirements for dog imports have been revised in recent years and can include an online CDC import form and supporting documentation depending on the dog\'s vaccination history and recent travel. Confirm the current process with CDC before booking.',
      },
      {
        question: 'Is quarantine required entering the US from Canada?',
        answer:
          'Pets arriving with valid documentation are not commonly subject to a quarantine period on this corridor. This remains subject to the CDC and APHIS rules in force at the time of travel.',
      },
      {
        question: 'How fast can this move happen?',
        answer:
          'One to three weeks is a reasonable planning figure, since there is no rabies titer test and no mandatory waiting period to elapse. Veterinary appointment availability is usually the real constraint.',
      },
    ],
  },
  'canada-to-australia': {
    intro:
      'Australia operates one of the strictest and longest pet import processes in the world, and a move from Canada should be planned in months rather than weeks. Canada is an approved country for this purpose — it sits in one of the country groups the Department of Agriculture, Fisheries and Forestry recognises, which is what makes a direct import possible at all. Pets resident in countries that are not approved cannot be imported to Australia directly; they generally have to spend a qualifying period in an approved country first. Being approved does not make the process short: DAFF still requires a sequence of blood tests, waiting periods and treatments before it will grant an import permit, followed by a period of post-arrival quarantine at a government facility. Every step is sequenced, so a missed interval restarts part of the chain rather than delaying it by the same number of days.',
    requirements: [
      'ISO-compliant microchip implanted before any rabies testing or treatment begins, since every subsequent result is tied to that chip number.',
      'Rabies vaccination followed by a rabies neutralising antibody titer (RNATT) test, with a waiting period after the blood draw before later steps may proceed. The interval is set by DAFF and should be confirmed rather than estimated.',
      'Import permit granted by DAFF. The permit has to be in hand before travel is booked, and the application itself takes processing time.',
      'Pre-export health checks, parasite treatments and any further tests specified in the DAFF conditions that apply to Canada\'s country group at the time of the application.',
      'Post-arrival quarantine at a government-approved facility — currently the post-entry quarantine facility at Mickleham, near Melbourne — for a minimum period set by DAFF, with places booked in advance.',
      'Verify current rules: export certification is handled through the Canadian Food Inspection Agency, and every import condition, interval and country-group designation is set by Australia\'s Department of Agriculture, Fisheries and Forestry (DAFF). Confirm the current conditions with DAFF before any testing begins.',
    ],
    timeline:
      'This corridor has the longest lead time of any listed here. Plan for roughly six to nine months from the first titer test to arrival. That figure is driven almost entirely by the DAFF waiting periods and by quarantine facility availability, which is booked well ahead and can be the binding constraint rather than the testing itself. Treat the range as planning guidance and confirm current timing with DAFF, since both the required intervals and the facility booking window change.',
    crateAndAirline:
      'DAFF specifies its own container standards for pets entering Australia, and in some respects these are stricter than general IATA sizing. The crate has to satisfy both the airline\'s IATA requirements and the Australian conditions, so it is specified against the permit rather than chosen from a size chart, and your coordinator confirms the crate specification before booking.',
    costFactors:
      'Cost on this corridor reflects the extended testing and quarantine timeline on top of the usual size, crate and transport factors. Quarantine facility fees are set and billed by the facility, separately from transport, and vary with the length of stay. Laboratory work, the permit application, and the longer period over which vaccinations and certificates have to be kept valid all add cost that shorter corridors do not carry.',
    faqs: [
      {
        question: 'Why does the Canada-Australia route take so much longer than others?',
        answer:
          'Australia requires rabies titer testing, mandatory waiting periods and additional treatments before DAFF will issue an import permit, followed by post-arrival quarantine. Each of those steps is sequential, which adds months compared with corridors that have neither titer nor quarantine requirements.',
      },
      {
        question: 'Is quarantine mandatory for every pet entering Australia?',
        answer:
          'Yes. Cats and dogs entering Australia complete a period of post-arrival quarantine at an approved government facility, with the minimum period set by DAFF. Canada is an approved country for import purposes, which is what permits a direct move; pets resident in non-approved countries cannot be imported directly and generally have to spend a qualifying period in an approved country first.',
      },
      {
        question: 'How far ahead should this process start?',
        answer:
          'As early as possible, and realistically six to nine months before the target arrival date. The waiting periods alone account for much of that, and quarantine facility places have to be booked well in advance. Confirm current timing with DAFF before setting a target date.',
      },
    ],
  },
} satisfies Record<RouteSlug, RouteContentEntry>
