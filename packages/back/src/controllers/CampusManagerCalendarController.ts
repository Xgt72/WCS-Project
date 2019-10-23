import { Request, Response } from "express";
import { CampusManagerActivitiesCalendarRepository } from "../repositories/CampusManagerActivitiesCalendarRepository";
import { CampusManagerActivitiesCalendar } from "../entities/CampusManagerActivitiesCalendar";
import { Mutator } from "../entities/Mutator";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { PlayerCampusManagerRepository } from "../repositories/PlayerCampusManagerRepository";
import { ActivityRepository } from "../repositories/ActivityRepository";
import { MutatorRepository } from "../repositories/MutatorRepository";

let campusManagerCalendarRepo = new CampusManagerActivitiesCalendarRepository();
let indicatorRepo = new IndicatorRepository();
let playerCampusManagerRepo = new PlayerCampusManagerRepository();
let activityRepo = new ActivityRepository();
let mutatorRepo = new MutatorRepository();

export let addActivitiesInCampusManagerCalendar = async (req: Request, res: Response) => {
    try {
      // get the player id of this campus manager
      let response = await playerCampusManagerRepo.getPlayerCampusManagerById(req.body.campus_manager_id);
      let playerId = response.player_id;

      // get the indicators of this player
      let indicators = await indicatorRepo.getAllIndicatorsByPlayerId(playerId);

      // activities to add
      let updatedActivities: CampusManagerActivitiesCalendar[] = req.body.activities;

      // Create new activities
      for (let i = 0; i < updatedActivities.length; i++) {
          let activity = await activityRepo.getActivityById(updatedActivities[i].activity_id);
          activity.id = null;
          let mutators = Mutator.cloneListWithIndicators(activity.mutators, indicators);
          if (mutators.length > 0) {
              for (let i = 0; i < mutators.length; i++) {
                  mutators[i] = await mutatorRepo.saveMutator(mutators[i]);
              }
              activity.mutators = mutators;
          }
          activity = await activityRepo.saveActivity(activity);

          updatedActivities[i].activity_id = activity.id;
      }

      // add the new lines in the calendar
      for (let i = 0; i < updatedActivities.length; i++) {
          if (updatedActivities[i].morning) {
              let morningActivity: CampusManagerActivitiesCalendar = await campusManagerCalendarRepo.getActivityByCampusManagerIdByDayByMorning(
                  req.body.teacher_id, updatedActivities[i].day
              );
              if (morningActivity != null) {
                  updatedActivities[i].id = morningActivity.id;
              }
          } else if (updatedActivities[i].afternoon) {
              let afternoonActivity: CampusManagerActivitiesCalendar = await campusManagerCalendarRepo.getActivityByCampusManagerIdByDayByAfternoon(
                  req.body.teacher_id, updatedActivities[i].day
              );
              if (afternoonActivity != null) {
                  updatedActivities[i].id = afternoonActivity.id;
              }
          }
      }

      let campusManagerCalendar: CampusManagerActivitiesCalendar[] = await campusManagerCalendarRepo.saveMultipleActivitiesCampusManager(updatedActivities);
      res.send(campusManagerCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}