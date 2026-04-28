"use client";

import { forwardRef } from "react";
import { User } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { CardData } from "./card-form";

interface CardPreviewProps {
  data: CardData;
}

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ data }, ref) => {
    const clearanceDate = new Date().toISOString().replace("T", " ").slice(0, 19);
    
    // Build verification URL for raims.oep.gov.bd
    // QR code will link to the official BMET verification page with passport number
    const passportNo = data.passportNo || "A01297588";
    const verificationUrl = `https://raims.oep.gov.bd/smart-card-verification.je?passportNo=${passportNo}`;

    return (
      <div ref={ref} className="flex flex-col gap-4 bg-gray-100 p-4 rounded-xl">
        {/* Main Card */}
        <div className="w-full max-w-[380px] mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Card Content */}
          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-gray-800">BMET EC Card</h3>
                <p className="text-[11px] text-gray-600">
                  BMET ID: <span className="font-semibold">{data.bmetId || "FNM20266007766G"}</span>
                </p>
                <p className="text-[11px] text-gray-600">
                  Clearance ID: <span className="font-semibold">{data.clearanceId || "FJ-G-2026-7965556"}</span>
                </p>
              </div>
              <div className="flex gap-1">
                {/* Bangladesh Emblem */}
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center border border-green-600">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-yellow-300" fill="currentColor">
                    <path d="M12 2L9 9H2L7 13L5 21L12 16L19 21L17 13L22 9H15L12 2Z" />
                  </svg>
                </div>
                {/* BMET Logo */}
                <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 my-2"></div>

            {/* Main Info Section */}
            <div className="flex gap-3">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-20 h-24 bg-gray-200 rounded-md overflow-hidden border border-gray-300 flex items-center justify-center">
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
              </div>

              {/* Details */}
              <div className="flex-1 space-y-1">
                <div>
                  <p className="text-[10px] text-gray-500">Name</p>
                  <p className="text-sm font-bold text-gray-800 uppercase">
                    {data.fullName || "NURUL ISLAM"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Father&apos;s Name</p>
                  <p className="text-xs font-semibold text-gray-700 uppercase">
                    <span className="text-red-600">{(data.fatherName || "KABIR AHAMMAD").charAt(0)}</span>
                    {(data.fatherName || "KABIR AHAMMAD").slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Mother&apos;s Name</p>
                  <p className="text-xs font-semibold text-gray-700 uppercase">
                    <span className="text-red-600">{(data.motherName || "PEARA BEGUM").charAt(0)}</span>
                    {(data.motherName || "PEARA BEGUM").slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Destination Country</p>
                  <p className="text-xs font-semibold text-gray-800">
                    {data.destination || "Fiji"}
                  </p>
                </div>
              </div>
            </div>

            {/* Dashed Divider */}
            <div className="border-t border-dashed border-gray-300 my-3"></div>

            {/* Bottom Info */}
            <div className="flex justify-between text-[11px]">
              <div>
                <p className="text-gray-500">Passport Number</p>
                <p className="font-bold text-gray-800">{data.passportNo || "A01297588"}</p>
              </div>
              <div>
                <p className="text-gray-500">Passport Issue Date</p>
                <p className="font-bold text-gray-800">{data.passportIssueDate || "2021-06-21"}</p>
              </div>
              <div>
                <p className="text-gray-500">RL ID</p>
                <p className="font-bold text-blue-600">{data.rlId || "RL189"}</p>
              </div>
            </div>

            {/* Clearance Date */}
            <div className="mt-2 text-center">
              <p className="text-[11px] text-gray-600">
                Clearance Date: <span className="font-bold">{clearanceDate}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Verification Card */}
        <div className="w-full max-w-[380px] mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4">
            {/* Header */}
            <h4 className="text-center font-bold text-gray-800 mb-3">Verify this card</h4>

            {/* Content */}
            <div className="flex gap-4">
              {/* QR Code */}
              <div className="flex-shrink-0">
                <QRCodeSVG
                  value={verificationUrl}
                  size={100}
                  level="M"
                  className="rounded"
                />
              </div>

              {/* Instructions */}
              <div className="flex-1 text-[11px] text-gray-600 space-y-2">
                <p>1. Scan QR code {">"}{">"}  Visit the url.</p>
                <p className="text-center font-bold text-gray-800">OR</p>
                <p>
                  2. raims.oep.gov.bd {">"}{">"}  Click &apos;Verify BMET EC card&apos; {">"}{">"}  Enter passport no. {">"}{">"}  Submit & Verify your card
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-3 pt-2 border-t border-gray-200">
              <p className="text-[11px] text-center text-gray-600">
                This card holder is under insurance coverage & welfare services
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CardPreview.displayName = "CardPreview";
