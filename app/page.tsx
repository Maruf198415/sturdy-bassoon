"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { CardForm, type CardData } from "@/components/card-form";
import { CardPreview } from "@/components/card-preview";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

const initialData: CardData = {
  fullName: "",
  fatherName: "",
  motherName: "",
  dateOfBirth: "",
  gender: "",
  bloodGroup: "",
  nidNo: "",
  mobileNo: "",
  passportNo: "",
  passportIssueDate: "",
  passportExpireDate: "",
  visaNo: "",
  visaIssueDate: "",
  visaExpireDate: "",
  bmetId: "",
  clearanceId: "",
  rlId: "",
  destination: "",
  agencyName: "",
  agencyLicenseNo: "",
  agencyPhone: "",
  employerName: "",
  village: "",
  postOffice: "",
  policeStation: "",
  district: "",
  emergencyName: "",
  emergencyRelation: "",
  emergencyMobile: "",
  photo: null,
};

export default function ManpowerCardGenerator() {
  const [cardData, setCardData] = useState<CardData>(initialData);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#f3f4f6",
      });

      const link = document.createElement("a");
      link.download = `BMET-EC-Card-${cardData.fullName || "unnamed"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating card image:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    setCardData(initialData);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 via-red-600 to-green-700 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-red-600" fill="currentColor">
                <circle cx="12" cy="12" r="8" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold">BMET EC Card Generator</h1>
              <p className="text-xs text-green-100">বহির্গমন ছাড়পত্র কার্ড জেনারেটর</p>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs text-yellow-200">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</p>
            <p className="text-xs text-green-100">জনশক্তি, কর্মসংস্থান ও প্রশিক্ষণ ব্যুরো</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div>
            <CardForm data={cardData} onChange={setCardData} />

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3 sticky bottom-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-5"
              >
                <Download className="w-5 h-5 mr-2" />
                {isDownloading ? "Downloading..." : "Download Card"}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 py-5"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Card Preview / কার্ড প্রিভিউ
              </h2>
              <CardPreview ref={cardRef} data={cardData} />

              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-sm font-semibold text-green-800 mb-2">নির্দেশনা / Instructions:</h3>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>1. সমস্ত তথ্য সঠিকভাবে পূরণ করুন</li>
                  <li>2. পাসপোর্ট সাইজের একটি স্পষ্ট ছবি আপলোড করুন</li>
                  <li>3. কার্ড PNG ফরম্যাটে ডাউনলোড করতে &quot;Download Card&quot; ক্লিক করুন</li>
                  <li>4. QR কোড স্ক্যান করলে সমস্ত তথ্য সহ ভেরিফিকেশন পেজ দেখাবে</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 px-4 mt-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-300">
            BMET EC Card Generator - শুধুমাত্র প্রদর্শনের জন্য
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Bureau of Manpower, Employment and Training (BMET)
          </p>
        </div>
      </footer>
    </main>
  );
}
