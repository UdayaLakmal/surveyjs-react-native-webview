// types/navigation.ts
import type { Survey } from "../constants/data";

export type RootStackParamList = {
    SurveyList: undefined;
    SurveyDetail: { survey: Survey };
};