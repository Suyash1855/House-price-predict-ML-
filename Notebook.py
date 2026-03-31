# ============================================================
# HOUSE PRICE PREDICTION — Full ML Notebook
# ============================================================
# Steps:
#   1. Imports
#   2. Load & Inspect Data
#   3. Exploratory Data Analysis (EDA)
#   4. Clean Data
#   5. Feature Scaling
#   6. Train Models (Linear Regression, Decision Tree, Random Forest)
#   7. Evaluate & Compare Models
#   8. Save Best Model
# ============================================================


# ------------------------------------------------------------
# 1. IMPORTS
# ------------------------------------------------------------
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

import joblib


# ------------------------------------------------------------
# 2. LOAD & INSPECT DATA
# ------------------------------------------------------------
df = pd.read_csv("housing.csv")
df = df.drop(columns=["Address"], errors="ignore")

print("Shape:", df.shape)
print("\nFirst 5 rows:")
print(df.head())

print("\nData Info:")
print(df.info())

print("\nStatistical Summary:")
print(df.describe())

print("\nMissing Values:")
print(df.isnull().sum())


# ------------------------------------------------------------
# 3. EXPLORATORY DATA ANALYSIS (EDA)
# ------------------------------------------------------------

# --- 3a. Distribution of each feature ---
df.hist(figsize=(12, 8), bins=30, color="steelblue", edgecolor="white")
plt.suptitle("Feature Distributions", fontsize=14)
plt.tight_layout()
plt.show()

# --- 3b. Scatter plots: each feature vs Price ---
features = [
    "Avg. Area Income",
    "Avg. Area House Age",
    "Avg. Area Number of Rooms",
    "Area Population",
]

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
axes = axes.flatten()

for i, feature in enumerate(features):
    axes[i].scatter(df[feature], df["Price"], alpha=0.3, color="steelblue", edgecolors="none")
    axes[i].set_xlabel(feature)
    axes[i].set_ylabel("House Price")
    axes[i].set_title(f"{feature} vs Price")

plt.tight_layout()
plt.show()

# --- 3c. Correlation Heatmap ---
numeric_df = df.select_dtypes(include=["number"])

plt.figure(figsize=(9, 6))
sns.heatmap(
    numeric_df.corr(),
    annot=True,
    fmt=".2f",
    cmap="coolwarm",
    linewidths=0.5,
)
plt.title("Correlation Heatmap")
plt.tight_layout()
plt.show()

# --- 3d. Price Distribution ---
plt.figure(figsize=(8, 5))
sns.histplot(df["Price"], bins=40, kde=True, color="steelblue")
plt.title("House Price Distribution")
plt.xlabel("Price")
plt.ylabel("Count")
plt.tight_layout()
plt.show()

# --- 3e. Boxplots to detect outliers ---
plt.figure(figsize=(12, 5))
for i, feature in enumerate(features):
    plt.subplot(1, 4, i + 1)
    sns.boxplot(y=df[feature], color="lightblue")
    plt.title(feature.replace("Avg. Area ", "").replace("Area ", ""))
plt.suptitle("Boxplots — Outlier Check", fontsize=13)
plt.tight_layout()
plt.show()


# ------------------------------------------------------------
# 4. CLEAN DATA
# ------------------------------------------------------------

# Drop rows with missing values (dataset is clean, but good practice)
before = len(df)
df = df.dropna()
after = len(df)
print(f"Rows before: {before} | Rows after dropna: {after} | Dropped: {before - after}")

# Define features and target
X = df.drop("Price", axis=1)
y = df["Price"]

# Train / test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"\nTraining samples : {X_train.shape[0]}")
print(f"Test samples     : {X_test.shape[0]}")


# ------------------------------------------------------------
# 5. FEATURE SCALING
# ------------------------------------------------------------
# Important for Linear Regression — not needed for tree models
# but we scale everything for consistency in the pipeline

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)   # fit + transform on train
X_test_scaled  = scaler.transform(X_test)         # transform only on test


# ------------------------------------------------------------
# 6. TRAIN MODELS
# ------------------------------------------------------------

# --- 6a. Linear Regression ---
lr = LinearRegression()
lr.fit(X_train_scaled, y_train)
lr_preds = lr.predict(X_test_scaled)

# --- 6b. Decision Tree ---
dt = DecisionTreeRegressor(random_state=42, max_depth=10)
dt.fit(X_train, y_train)
dt_preds = dt.predict(X_test)

# --- 6c. Random Forest ---
rf = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
rf.fit(X_train, y_train)
rf_preds = rf.predict(X_test)


# ------------------------------------------------------------
# 7. EVALUATE & COMPARE MODELS
# ------------------------------------------------------------

def evaluate_model(name, y_true, y_pred):
    mse  = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    mae  = mean_absolute_error(y_true, y_pred)
    r2   = r2_score(y_true, y_pred)
    return {"Model": name, "R²": round(r2, 4), "RMSE": round(rmse, 2), "MAE": round(mae, 2)}

results = pd.DataFrame([
    evaluate_model("Linear Regression", y_test, lr_preds),
    evaluate_model("Decision Tree",     y_test, dt_preds),
    evaluate_model("Random Forest",     y_test, rf_preds),
])

print("\n===== MODEL COMPARISON =====")
print(results.to_string(index=False))
print("============================\n")

# --- 7a. Actual vs Predicted — all 3 models ---
fig, axes = plt.subplots(1, 3, figsize=(16, 5))
model_data = [
    ("Linear Regression", lr_preds, "steelblue"),
    ("Decision Tree",     dt_preds, "darkorange"),
    ("Random Forest",     rf_preds, "seagreen"),
]

for ax, (name, preds, color) in zip(axes, model_data):
    ax.scatter(y_test, preds, alpha=0.3, color=color, edgecolors="none", s=15)
    ax.plot([y_test.min(), y_test.max()],
            [y_test.min(), y_test.max()],
            "r--", linewidth=1.5, label="Perfect fit")
    ax.set_xlabel("Actual Price")
    ax.set_ylabel("Predicted Price")
    ax.set_title(name)
    ax.legend()

plt.suptitle("Actual vs Predicted — Model Comparison", fontsize=14)
plt.tight_layout()
plt.show()

# --- 7b. Residual plot for best model (Random Forest) ---
residuals = y_test - rf_preds

plt.figure(figsize=(8, 5))
plt.scatter(rf_preds, residuals, alpha=0.3, color="seagreen", edgecolors="none", s=15)
plt.axhline(0, color="red", linestyle="--", linewidth=1.5)
plt.xlabel("Predicted Price")
plt.ylabel("Residual (Actual - Predicted)")
plt.title("Random Forest — Residual Plot")
plt.tight_layout()
plt.show()

# --- 7c. Feature Importance (Random Forest) ---
feat_importance = pd.Series(rf.feature_importances_, index=X.columns).sort_values(ascending=False)

plt.figure(figsize=(8, 5))
feat_importance.plot(kind="bar", color="seagreen", edgecolor="white")
plt.title("Random Forest — Feature Importance")
plt.ylabel("Importance Score")
plt.xticks(rotation=30, ha="right")
plt.tight_layout()
plt.show()

print("\nFeature Importance:")
print(feat_importance)

# --- 7d. Linear Regression Coefficients ---
coeff_df = pd.DataFrame(lr.coef_, X.columns, columns=["Coefficient"])
print("\nLinear Regression Coefficients:")
print(coeff_df)


# ------------------------------------------------------------
# 8. SAVE BEST MODEL (Random Forest)
# ------------------------------------------------------------
joblib.dump(lr, "model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("\nModel saved  -> model.pkl")
print("Scaler saved -> scaler.pkl")
print("\nDone! Ready for FastAPI deployment.")
import os
print(os.listdir())
