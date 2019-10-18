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

export let parkingTemplate: PlayerBuilding = new PlayerBuilding(0, "parking", 300, true);
parkingTemplate.mutators = [
    new Mutator("incReputation", 1, 2),
    new Mutator("decBudget", 2, -50)
];

let activityOne = new Activity("Wild Breakfast", 100, "FFB399");
activityOne.mutators = [
    new Mutator("incReputation", 1, 0.1),
    new Mutator("decBudget", 2, -10)
];
let activityTwo = new Activity("Organise RNCP", 200, "FFE205");
activityTwo.mutators = [
    new Mutator("incReputation", 1, 0.02),
    new Mutator("decBudget", 2, -5)
];
let activityThree = new Activity("Buy Publicities", 350, "75FF05");
activityThree.mutators = [
    new Mutator("incReputation", 1, 0.5),
    new Mutator("decBudget", 2, -80)
];

export let activitiesTemplate: Activity[] = [
    activityOne,
    activityTwo,
    activityThree
];