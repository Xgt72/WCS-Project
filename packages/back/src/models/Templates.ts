import { PlayerTeacher } from "../entities/PlayerTeacher";
import { Mutator } from "../entities/Mutator";
import { PlayerBuilding } from "../entities/PlayerBuilding";
import { PlayerCampusManager } from "../entities/PlayerCampusManager";
import { Activity } from "../entities/Activity";
import { Indicator } from "../entities/Indicator";
import { REPUTATION, BUDGET, FUTURE_STUDENTS_NUMBER, ACTUAL_STUDENTS_NUMBER, FORECAST_SALES_TURNOVER } from "../constants";

export let indicatorsTemplates: Indicator[] = [
    new Indicator(REPUTATION, 0, 30),
    new Indicator(BUDGET, 0, 5000),
    new Indicator(ACTUAL_STUDENTS_NUMBER, 0, 0),
    new Indicator(FUTURE_STUDENTS_NUMBER, 0, 0),
    new Indicator(FORECAST_SALES_TURNOVER, 0, 0)
];

export let teacherTemplate: PlayerTeacher = new PlayerTeacher(0, "Junior Trainer", 200);
teacherTemplate.mutators = [
    new Mutator("inc" + REPUTATION, 1, 5),
    new Mutator("dec" + BUDGET, 2, -100)
];

export let campusManagerTemplate: PlayerCampusManager = new PlayerCampusManager(0, "Best Campus Manager", 300);
campusManagerTemplate.mutators = [
    new Mutator("inc" + REPUTATION, 1, 2),
    new Mutator("dec" + BUDGET, 2, -80)
];

export let classroomTemplate: PlayerBuilding = new PlayerBuilding(0, "classroom", 500, true);
classroomTemplate.mutators = [
    new Mutator("inc" + REPUTATION, 1, 5),
    new Mutator("dec" + BUDGET, 2, -100)
];

export let parkingTemplate: PlayerBuilding = new PlayerBuilding(0, "parking", 200, true);
parkingTemplate.mutators = [
    new Mutator("inc" + REPUTATION, 1, 2),
    new Mutator("dec" + BUDGET, 2, -20)
];

export let cafeteriaTemplate: PlayerBuilding = new PlayerBuilding(0, "cafeteria", 350, true);
cafeteriaTemplate.mutators = [
    new Mutator("inc" + REPUTATION, 1, 4),
    new Mutator("dec" + BUDGET, 2, -50)
];

export let dormsTemplate: PlayerBuilding = new PlayerBuilding(0, "dorms", 250, true);
dormsTemplate.mutators = [
    new Mutator("inc" + REPUTATION, 1, 3),
    new Mutator("dec" + BUDGET, 2, -40)
];

let campusManagerActivityOne: Activity = new Activity("Wild Breakfast", 100, "69c7b5");
campusManagerActivityOne.mutators = [
    new Mutator("inc" + REPUTATION, 1, 0.1),
    new Mutator("dec" + BUDGET, 2, -80),
    new Mutator("inc" + FUTURE_STUDENTS_NUMBER, 3, 1)
];

let campusManagerActivityTwo: Activity = new Activity("Organise RNCP", 200, "3b5998");
campusManagerActivityTwo.mutators = [
    new Mutator("inc" + REPUTATION, 1, 0.2),
    new Mutator("dec" + BUDGET, 2, -200),
    new Mutator("inc" + FUTURE_STUDENTS_NUMBER, 3, 1)
];

let campusManagerActivityThree: Activity = new Activity("Buy Publicities", 350, "bf49a0");
campusManagerActivityThree.mutators = [
    new Mutator("inc" + REPUTATION, 1, 0.5),
    new Mutator("dec" + BUDGET, 2, -80),
    new Mutator("inc" + FUTURE_STUDENTS_NUMBER, 3, 1)

];

let campusManagerActivityFour: Activity = new Activity("Wild Aperitif", 100, "cf0921");
campusManagerActivityFour.mutators = [
    new Mutator("inc" + REPUTATION, 1, 0.4),
    new Mutator("dec" + BUDGET, 2, -80),
    new Mutator("inc" + FUTURE_STUDENTS_NUMBER, 3, 1)

];

let campusManagerActivityFive: Activity = new Activity("Networking", 50, "ff6c33");
campusManagerActivityFive.mutators = [
    new Mutator("dec" + BUDGET, 2, -50),
    new Mutator("inc" + FUTURE_STUDENTS_NUMBER, 3, 1)

];

let campusManagerActivitySix: Activity = new Activity("Organize a Trade Fair", 450, "55c671");
campusManagerActivitySix.mutators = [
    new Mutator("inc" + REPUTATION, 1, 0.6),
    new Mutator("dec" + BUDGET, 2, -80),
    new Mutator("inc" + FUTURE_STUDENTS_NUMBER, 3, 1)

];

let campusManagerActivitySeven: Activity = new Activity("Internal Management", 100, "ff83da");
campusManagerActivitySeven.mutators = [
    new Mutator("dec" + BUDGET, 2, -50)
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
    new Mutator("inc" + REPUTATION, 1, 0.6),
    new Mutator("dec" + BUDGET, 2, -80)
];

let teacherActivityTwo: Activity = new Activity("Prepare a Course", 100, "3b5998");
teacherActivityTwo.mutators = [
    new Mutator("inc" + REPUTATION, 1, 0.6),
    new Mutator("dec" + BUDGET, 2, -80)
];

let teacherActivityThree: Activity = new Activity("Give a Course", 100, "bf49a0");
teacherActivityThree.mutators = [
    new Mutator("inc" + REPUTATION, 1, 0.6),
    new Mutator("dec" + BUDGET, 2, -80)
];

let teacherActivityFour: Activity = new Activity("Correction of a Wild Circus Candidate", 100, "cf0921");
teacherActivityFour.mutators = [
    new Mutator("inc" + REPUTATION, 1, 0.6),
    new Mutator("dec" + BUDGET, 2, -80)
];

let teacherActivityFive: Activity = new Activity("Workshop or Live Coding", 100, "ff6c33");
teacherActivityFive.mutators = [
    new Mutator("inc" + REPUTATION, 1, 0.6),
    new Mutator("dec" + BUDGET, 2, -80)
];

export let teacherActivitiesTemplates: Activity[] = [
    teacherActivityOne,
    teacherActivityTwo,
    teacherActivityThree,
    teacherActivityFour,
    teacherActivityFive
];