import mongoose, { Schema, model, models } from "mongoose";

const InquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    company: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },
    service: {
      type: String,
      required: true,
      enum: [
        "web-development",
        "mobile-apps",
        "ui-ux-branding",
        "video-motion",
      ],
    },
    features: {
      type: [String],
      default: [],
      validate: {
        validator: (items: string[]) =>
          items.length <= 30 &&
          items.every(
            (item) =>
              typeof item === "string" &&
              item.trim().length > 0 &&
              item.length <= 150
          ),
        message: "Invalid feature list",
      },
    },
    budget: {
      type: String,
      required: true,
      enum: ["under-25k", "25k-50k", "50k-1l", "1l-plus"],
    },
    timeline: {
      type: String,
      required: true,
      enum: ["urgent", "2-4-weeks", "1-2-months", "flexible"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
    emailStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    emailError: {
      type: String,
      default: "",
      select: false,
    },
  },
  { timestamps: true }
);

InquirySchema.index({ createdAt: -1 });
InquirySchema.index({ email: 1 });

const Inquiry =
  models.Inquiry || model("Inquiry", InquirySchema);

export default Inquiry;