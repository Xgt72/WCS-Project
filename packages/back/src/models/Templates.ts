import { PlayerTeacher } from "../entities/PlayerTeacher";
import { Mutator } from "../entities/Mutator";
import { PlayerBuilding } from "../entities/PlayerBuilding";
import { PlayerCampusManager } from "../entities/PlayerCampusManager";
import { Activity } from "../entities/Activity";

export let teacherTemplate: PlayerTeacher = new PlayerTeacher(0, "Junior Trainer", 200);
teacherTemplate.mutators = [
    new Mutator("incReputation", 1, 5),
    new Mutator("decBudget", 2, -100)
];

export let campusManagerTemplate: PlayerCampusManager = new PlayerCampusManager(0, "Best Campus Manager", 300);
campusManagerTemplate.mutators = [
    new Mutator("incReputation", 1, 2),
    new Mutator("decBudget", 2, -80)
];

export let classroomTemplate: PlayerBuilding = new PlayerBuilding(0, "classroom", 500, true);
classroomTemplate.mutators = [
    new Mutator("incReputation", 1, 5),
    new Mutator("decBudget", 2, -100)
];

export let parkingTemplate: PlayerBuilding = new PlayerBuilding(0, "parking", 200, true);
parkingTemplate.mutators = [
    new Mutator("incReputation", 1, 2),
    new Mutator("decBudget", 2, -20)
];

export let cafeteriaTemplate: PlayerBuilding = new PlayerBuilding(0, "cafeteria", 350, true);
cafeteriaTemplate.mutators = [
    new Mutator("incReputation", 1, 4),
    new Mutator("decBudget", 2, -50)
];

export let dormsTemplate: PlayerBuilding = new PlayerBuilding(0, "dorms", 250, true);
dormsTemplate.mutators = [
    new Mutator("incReputation", 1, 3),
    new Mutator("decBudget", 2, -40)
];

let campusManagerActivityOne: Activity = new Activity("Wild Breakfast", 100, "69c7b5");
campusManagerActivityOne.mutators = [
    new Mutator("incReputation", 1, 0.1),
    new Mutator("decBudget", 2, -10)
];

let campusManagerActivityTwo: Activity = new Activity("Organise RNCP", 200, "3b5998");
campusManagerActivityTwo.mutators = [
    new Mutator("incReputation", 1, 0.2),
    new Mutator("decBudget", 2, -5)
];

let campusManagerActivityThree: Activity = new Activity("Buy Publicities", 350, "bf49a0");
campusManagerActivityThree.mutators = [
    new Mutator("incReputation", 1, 0.5),
    new Mutator("decBudget", 2, -80)
];

let campusManagerActivityFour: Activity = new Activity("Wild Aperitif", 100, "cf0921");
campusManagerActivityThree.mutators = [
    new Mutator("incReputation", 1, 0.4),
    new Mutator("decBudget", 2, -50)
];

let campusManagerActivityFive: Activity = new Activity("Networking", 50, "ff6c33");
campusManagerActivityThree.mutators = [
    new Mutator("incReputation", 1, 0.5),
    new Mutator("decBudget", 2, -80)
];

let campusManagerActivitySix: Activity = new Activity("Organize a Trad Fair", 450, "55c671");
campusManagerActivityThree.mutators = [
    new Mutator("incReputation", 1, 0.6),
    new Mutator("decBudget", 2, -80)
];

let campusManagerActivitySeven: Activity = new Activity("Internal Management", 100, "ff83da");
campusManagerActivityThree.mutators = [
    new Mutator("incReputation", 1, 0.5),
    new Mutator("decBudget", 2, -80)
];

export let campusManagerActivitiesTemplates: Activity[] = [
    campusManagerActivityOne,
    campusManagerActivityTwo,
    campusManagerActivityThree,
    campusManagerActivityFour,
    campusManagerActivityFive,
    campusManagerActivitySix,
    campusManagerActivitySeven
];

let teacherActivityOne: Activity = new Activity("Weekly Meeting", 100, "69c7b5");
teacherActivityOne.mutators = [
    new Mutator("incReputation", 1, 0.6),
    new Mutator("decBudget", 2, -80)
];

let teacherActivityTwo: Activity = new Activity("Prepare a Course", 100, "3b5998");
teacherActivityTwo.mutators = [
    new Mutator("incReputation", 1, 0.6),
    new Mutator("decBudget", 2, -80)
];

let teacherActivityThree: Activity = new Activity("Give a Course", 100, "bf49a0");
teacherActivityThree.mutators = [
    new Mutator("incReputation", 1, 0.6),
    new Mutator("decBudget", 2, -80)
];

let teacherActivityFour: Activity = new Activity("Correction of a Wild Circus Candidate", 100, "cf0921");
teacherActivityFour.mutators = [
    new Mutator("incReputation", 1, 0.6),
    new Mutator("decBudget", 2, -80)
];

let teacherActivityFive: Activity = new Activity("Workshop or Live Coding", 100, "ff6c33");
teacherActivityFive.mutators = [
    new Mutator("incReputation", 1, 0.6),
    new Mutator("decBudget", 2, -80)
];

export let teacherActivitiesTemplates: Activity[] = [
    teacherActivityOne,
    teacherActivityTwo,
    teacherActivityThree,
    teacherActivityFour,
    teacherActivityFive
];