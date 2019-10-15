import { Activity } from "../entities/Activity";
import { getManager } from "typeorm";

export class ActivityRepository {
    getAllActivities() {
        return getManager().getRepository(Activity).find();
    }

    saveAllActivities(activities: Activity[]){
        return getManager().getRepository(Activity).save(activities);
    }

    saveActivity(activity: Activity) {
        return getManager().getRepository(Activity).save(activity);
    }

    deleteActivity(activity: Activity) {
        return getManager().getRepository(Activity).remove(activity);
    }

    getActivityById(activityId: number) {
        return getManager().getRepository(Activity).findOne(activityId);
    }
}