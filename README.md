AI-Powered Customer Churn Predictor

Description:
This web application predicts whether a customer is likely to churn (leave) or stay using AI/ML. It helps companies identify high-risk customers and take proactive measures such as discounts or offers to retain them. The app provides prediction confidence and a risk level (High / Medium / Low) for better decision-making.

project: https://ai-customer-churn-prediction.lovable.app

Features

Predict Will Stay / Will Churn / Medium Risk for each customer

Shows Confidence % along with Risk Level

Handles demographic, subscription, usage, and payment features

Frontend: React + Tailwind + Neon UI + Animated Stars

Backend: Python FastAPI + Random Forest / XGBoost

Modular and ready for synthetic or real datasets

Responsive and user-friendly interface

Input Fields

Demographics: Gender, Senior Citizen, Partner, Dependents, Age

Subscription Info: Tenure, Contract Type, Payment Method, Paperless Billing, Multiple Services, Streaming Services Used

Usage / Interaction: Monthly Charges, Total Charges, Complaints, Last Activity

Services / Products: Internet Service Type, Add-on Services, Plan Tier, Device Usage

Behavioral / Payment: Late Payments, Auto-Pay Enabled, Promotions Used, Referral Source

How It Works

Fill in the customer details in the form

Click Predict Churn

App returns:

Prediction: Will Stay / Will Churn

Confidence: 0–100%

Risk Level: Low / Medium / High

Companies can use this risk info to retain customers via offers or personalized communication

Tech Stack

Frontend: React, Tailwind CSS, Neon theme, Animated stars

Backend: Python, FastAPI, Joblib for ML model

ML Model: Random Forest Classifier or XGBoost

Dataset: Synthetic or real churn data

Usage

Clone the repository

Install dependencies for frontend and backend

Run FastAPI backend

Run React frontend

Fill the form and test predictions
