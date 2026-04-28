"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";

export interface CardData {
  // Basic Info
  fullName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  nidNo: string;
  mobileNo: string;
  
  // Passport Info
  passportNo: string;
  passportIssueDate: string;
  passportExpireDate: string;
  
  // Visa Info
  visaNo: string;
  visaIssueDate: string;
  visaExpireDate: string;
  
  // BMET Info
  bmetId: string;
  clearanceId: string;
  rlId: string;
  destination: string;
  
  // Recruiting Agency
  agencyName: string;
  agencyLicenseNo: string;
  agencyPhone: string;
  
  // Employer
  employerName: string;
  
  // Address
  village: string;
  postOffice: string;
  policeStation: string;
  district: string;
  
  // Emergency Contact
  emergencyName: string;
  emergencyRelation: string;
  emergencyMobile: string;
  
  photo: string | null;
}

interface CardFormProps {
  data: CardData;
  onChange: (data: CardData) => void;
}

const destinations = [
  "Saudi Arabia",
  "UAE",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain",
  "Malaysia",
  "Singapore",
  "Jordan",
  "Lebanon",
  "Fiji",
  "Maldives",
  "Brunei",
  "South Korea",
  "Japan",
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function CardForm({ data, onChange }: CardFormProps) {
  const handleChange = (field: keyof CardData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-card border border-gray-200 rounded-xl p-6 shadow-sm max-h-[80vh] overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-6">
        Enter Card Information
      </h2>

      <div className="space-y-6">
        {/* Photo Upload */}
        <div className="flex flex-col items-center gap-3 pb-4 border-b border-gray-100">
          <div className="relative w-24 h-28 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
            {data.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <Label
            htmlFor="photo"
            className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Upload Photo
          </Label>
          <Input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>

        {/* BMET IDs Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-green-700 border-b border-green-200 pb-1">BMET Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="bmetId" className="text-gray-600 text-xs font-medium">
                BMET ID
              </Label>
              <Input
                id="bmetId"
                value={data.bmetId}
                onChange={(e) => handleChange("bmetId", e.target.value)}
                placeholder="FNM20266007766G"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="clearanceId" className="text-gray-600 text-xs font-medium">
                Clearance ID (EC No)
              </Label>
              <Input
                id="clearanceId"
                value={data.clearanceId}
                onChange={(e) => handleChange("clearanceId", e.target.value)}
                placeholder="FJ-G-2026-7965556"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="rlId" className="text-gray-600 text-xs font-medium">
                RL ID
              </Label>
              <Input
                id="rlId"
                value={data.rlId}
                onChange={(e) => handleChange("rlId", e.target.value)}
                placeholder="RL189"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="destination" className="text-gray-600 text-xs font-medium">
                Destination Country
              </Label>
              <Select
                value={data.destination}
                onValueChange={(value) => handleChange("destination", value)}
              >
                <SelectTrigger className="border-gray-200 bg-white text-sm h-9">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((destination) => (
                    <SelectItem key={destination} value={destination}>
                      {destination}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-green-700 border-b border-green-200 pb-1">Personal Information</h3>
          <div className="space-y-1">
            <Label htmlFor="fullName" className="text-gray-600 text-xs font-medium">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="NURUL ISLAM"
              className="border-gray-200 bg-white text-sm h-9"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="fatherName" className="text-gray-600 text-xs font-medium">
                Father&apos;s Name
              </Label>
              <Input
                id="fatherName"
                value={data.fatherName}
                onChange={(e) => handleChange("fatherName", e.target.value)}
                placeholder="KABIR AHAMMAD"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="motherName" className="text-gray-600 text-xs font-medium">
                Mother&apos;s Name
              </Label>
              <Input
                id="motherName"
                value={data.motherName}
                onChange={(e) => handleChange("motherName", e.target.value)}
                placeholder="PEARA BEGUM"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="dateOfBirth" className="text-gray-600 text-xs font-medium">
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="gender" className="text-gray-600 text-xs font-medium">
                Gender
              </Label>
              <Select
                value={data.gender}
                onValueChange={(value) => handleChange("gender", value)}
              >
                <SelectTrigger className="border-gray-200 bg-white text-sm h-9">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="bloodGroup" className="text-gray-600 text-xs font-medium">
                Blood Group
              </Label>
              <Select
                value={data.bloodGroup}
                onValueChange={(value) => handleChange("bloodGroup", value)}
              >
                <SelectTrigger className="border-gray-200 bg-white text-sm h-9">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map((bg) => (
                    <SelectItem key={bg} value={bg}>
                      {bg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="nidNo" className="text-gray-600 text-xs font-medium">
                NID Number
              </Label>
              <Input
                id="nidNo"
                value={data.nidNo}
                onChange={(e) => handleChange("nidNo", e.target.value)}
                placeholder="8714251017"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="mobileNo" className="text-gray-600 text-xs font-medium">
                Mobile Number
              </Label>
              <Input
                id="mobileNo"
                value={data.mobileNo}
                onChange={(e) => handleChange("mobileNo", e.target.value)}
                placeholder="01XXXXXXXXX"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
          </div>
        </div>

        {/* Passport Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-green-700 border-b border-green-200 pb-1">Passport Information</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="passportNo" className="text-gray-600 text-xs font-medium">
                Passport No
              </Label>
              <Input
                id="passportNo"
                value={data.passportNo}
                onChange={(e) => handleChange("passportNo", e.target.value)}
                placeholder="A01297588"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="passportIssueDate" className="text-gray-600 text-xs font-medium">
                Issue Date
              </Label>
              <Input
                id="passportIssueDate"
                type="date"
                value={data.passportIssueDate}
                onChange={(e) => handleChange("passportIssueDate", e.target.value)}
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="passportExpireDate" className="text-gray-600 text-xs font-medium">
                Expire Date
              </Label>
              <Input
                id="passportExpireDate"
                type="date"
                value={data.passportExpireDate}
                onChange={(e) => handleChange("passportExpireDate", e.target.value)}
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
          </div>
        </div>

        {/* Visa Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-green-700 border-b border-green-200 pb-1">Visa Information</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="visaNo" className="text-gray-600 text-xs font-medium">
                Visa No
              </Label>
              <Input
                id="visaNo"
                value={data.visaNo}
                onChange={(e) => handleChange("visaNo", e.target.value)}
                placeholder="PIWP260300031A"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="visaIssueDate" className="text-gray-600 text-xs font-medium">
                Issue Date
              </Label>
              <Input
                id="visaIssueDate"
                type="date"
                value={data.visaIssueDate}
                onChange={(e) => handleChange("visaIssueDate", e.target.value)}
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="visaExpireDate" className="text-gray-600 text-xs font-medium">
                Expire Date
              </Label>
              <Input
                id="visaExpireDate"
                type="date"
                value={data.visaExpireDate}
                onChange={(e) => handleChange("visaExpireDate", e.target.value)}
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
          </div>
        </div>

        {/* Recruiting Agency Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-green-700 border-b border-green-200 pb-1">Recruiting Agency</h3>
          <div className="space-y-1">
            <Label htmlFor="agencyName" className="text-gray-600 text-xs font-medium">
              Agency Name
            </Label>
            <Input
              id="agencyName"
              value={data.agencyName}
              onChange={(e) => handleChange("agencyName", e.target.value)}
              placeholder="Ahlam Trade International"
              className="border-gray-200 bg-white text-sm h-9"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="agencyLicenseNo" className="text-gray-600 text-xs font-medium">
                License No
              </Label>
              <Input
                id="agencyLicenseNo"
                value={data.agencyLicenseNo}
                onChange={(e) => handleChange("agencyLicenseNo", e.target.value)}
                placeholder="RL189"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="agencyPhone" className="text-gray-600 text-xs font-medium">
                Phone
              </Label>
              <Input
                id="agencyPhone"
                value={data.agencyPhone}
                onChange={(e) => handleChange("agencyPhone", e.target.value)}
                placeholder="01804-654042"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
          </div>
        </div>

        {/* Employer Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-green-700 border-b border-green-200 pb-1">Employer</h3>
          <div className="space-y-1">
            <Label htmlFor="employerName" className="text-gray-600 text-xs font-medium">
              Employer Name
            </Label>
            <Input
              id="employerName"
              value={data.employerName}
              onChange={(e) => handleChange("employerName", e.target.value)}
              placeholder="TANOA INTERNATIONAL HOTEL LEVU ISLAND FIJI NADI"
              className="border-gray-200 bg-white text-sm h-9"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-green-700 border-b border-green-200 pb-1">Permanent Address</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="village" className="text-gray-600 text-xs font-medium">
                Village
              </Label>
              <Input
                id="village"
                value={data.village}
                onChange={(e) => handleChange("village", e.target.value)}
                placeholder="EAST MIRZAPUR, WARD NO-07"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="postOffice" className="text-gray-600 text-xs font-medium">
                Post Office
              </Label>
              <Input
                id="postOffice"
                value={data.postOffice}
                onChange={(e) => handleChange("postOffice", e.target.value)}
                placeholder="BOKTER MUNSHI-3900"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="policeStation" className="text-gray-600 text-xs font-medium">
                Police Station
              </Label>
              <Input
                id="policeStation"
                value={data.policeStation}
                onChange={(e) => handleChange("policeStation", e.target.value)}
                placeholder="SONAGAZI"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="district" className="text-gray-600 text-xs font-medium">
                District
              </Label>
              <Input
                id="district"
                value={data.district}
                onChange={(e) => handleChange("district", e.target.value)}
                placeholder="FENI"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-green-700 border-b border-green-200 pb-1">Emergency Contact</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="emergencyName" className="text-gray-600 text-xs font-medium">
                Name
              </Label>
              <Input
                id="emergencyName"
                value={data.emergencyName}
                onChange={(e) => handleChange("emergencyName", e.target.value)}
                placeholder="Contact Name"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="emergencyRelation" className="text-gray-600 text-xs font-medium">
                Relation
              </Label>
              <Input
                id="emergencyRelation"
                value={data.emergencyRelation}
                onChange={(e) => handleChange("emergencyRelation", e.target.value)}
                placeholder="Father/Mother/Brother"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="emergencyMobile" className="text-gray-600 text-xs font-medium">
                Mobile
              </Label>
              <Input
                id="emergencyMobile"
                value={data.emergencyMobile}
                onChange={(e) => handleChange("emergencyMobile", e.target.value)}
                placeholder="01XXXXXXXXX"
                className="border-gray-200 bg-white text-sm h-9"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
