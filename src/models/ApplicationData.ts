import {
  Education, Gender, HousingTenure, IncomeSource, JobArea, MaritalStatus, VehicleOwnership,
} from '../enum';

export interface ApplicationData {
  id?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  personalCode?: string;
  email?: string;
  phoneNumber?: string;
  maritalStatus?: MaritalStatus;
  education?: Education;
  monthlyIncome?: number;
  incomeSource?: IncomeSource;
  incomePayday?: number;
  jobArea?: JobArea;
  incomeContractStartedAt?: Date;
  iban?: string;
  usingOnlineBanking?: boolean;
  province?: string;
  city?: string;
  postalCode?: string;
  street?: string;
  streetOther?: string;
  houseNumber?: string;
  flatNumber?: string;
  housingTenure?: HousingTenure;
  vehicleOwnership?: VehicleOwnership;
  vehicleLicensePlateNumber?: string;
  amount?: number;
  period?: number;
  affiliateReference?: string;
  affiliateReferenceSubId?: string;
  affiliateReferenceTransactionId?: string;
  googleCaptchaToken?: string;
  deviceCookie?: string;
  deviceTime?: string;
  marketingConsents?: boolean;
  gclid?: string;
}
