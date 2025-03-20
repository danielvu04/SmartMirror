# Software Design Document

**for**  
## Smart Mirror System  
### Version 1.0 Approved  
**Prepared by:** Daniel Vu  
**Date:** 03/18/2025  

---

## Table of Contents

1. [Introduction](#1-introduction)
   - [1.1 Purpose](#11-purpose)
   - [1.2 Scope](#12-scope)
   - [1.3 Overview](#13-overview)
   - [1.4 Reference Material](#14-reference-material)
   - [1.5 Definitions and Acronyms](#15-definitions-and-acronyms)
2. [System Overview](#2-system-overview)
3. [System Architecture](#3-system-architecture)
   - [3.1 Architectural Design](#31-architectural-design)
   - [3.2 Decomposition Description](#32-decomposition-description)
   - [3.3 Design Rationale](#33-design-rationale)
4. [Data Design](#4-data-design)
   - [4.1 Data Description](#41-data-description)
   - [4.2 Data Dictionary](#42-data-dictionary)
5. [Component Design](#5-component-design)
6. [Human Interface Design](#6-human-interface-design)
   - [6.1 Overview of User Interface](#61-overview-of-user-interface)
   - [6.2 Screen Images](#62-screen-images)
   - [6.3 Screen Objects and Actions](#63-screen-objects-and-actions)
7. [Requirements Matrix](#7-requirements-matrix)

---

## 1. Introduction

### 1.1 Purpose
This Software Design Document (SDD) defines the design and system layout of the **Smart Mirror System**. The designated target market consists of software developers, system engineers, testers, and other stakeholders involved in system development. The SDD serves as the primary reference for software implementation, ensuring clarity and consistency in development.

### 1.2 Scope
The **Smart Mirror System** is an intelligent mirror that integrates real-time information, smart home controls, and AI-driven personalization. It provides users with weather updates, news feeds, voice assistant interactions, and facial recognition-based profiles. The system is designed to be modular, scalable, and user-friendly, supporting various IoT devices for seamless home automation.

### 1.3 Overview
This document describes the system's architecture, component design, data flow, and interface layout. It provides information on major system components and their interactions to support software development.

### 1.4 Reference Material
- **Software Requirements Specification (SRS)** for Smart Mirror System.
- **IEEE Recommended Practice for Software Design Description**.
- **Official Documentation** for Raspberry Pi OS, Python, OpenCV, TensorFlow, and MQTT.

### 1.5 Definitions and Acronyms
- **IoT** – Internet of Things.
- **API** – Application Programming Interface.
- **MQTT** – Message Queuing Telemetry Transport.
- **GUI** – Graphical User Interface.
- **AI** – Artificial Intelligence.

---

## 2. System Overview
The **Smart Mirror System** is a standalone, interactive device that provides users with real-time updates, smart home controls, and AI-based recommendations. The mirror is powered by a Raspberry Pi and integrates machine learning models for facial recognition and personalized user experiences.

### Features:
- **Real-Time Updates**: Weather, calendar, news.
- **Voice & Gesture Control**: Hands-free interactions.
- **Smart Home Integration**: Controls IoT devices.
- **Facial Recognition**: Personalized user profiles.
- **AI-Based Recommendations**: Content suggestions based on user activity.

---

## 3. System Architecture

### 3.1 Architectural Design
The **Smart Mirror System** consists of the following core modules:

- **User Interface Module**:
  - Provides a touchscreen or voice-controlled interface.
  - Displays relevant user data.
  - Interfaces with the Smart Mirror Processing Module.

- **Smart Mirror Processing Module**:
  - Handles voice and gesture recognition.
  - Retrieves and processes user data.
  - Interfaces with AI-based recommendation engines.

- **IoT Integration Module**:
  - Controls smart home devices.
  - Communicates with IoT platforms (e.g., Zigbee, MQTT, Wi-Fi).

- **AI Personalization Module**:
  - Processes facial recognition.
  - Generates personalized suggestions.

### 3.2 Decomposition Description
The system is decomposed into various components handling **UI, processing, AI integration, and IoT controls**. Each component interacts through APIs for modular functionality.

### 3.3 Design Rationale
This architecture follows a **modular approach**, allowing components to work independently while ensuring smooth data flow and integration.

---

## 4. Data Design

### 4.1 Data Description
The system processes and stores data related to users, IoT devices, and interactions. Key entities include:
- **User Profiles** – Stores facial recognition data, user preferences, and interaction history.
- **IoT Device Data** – Maintains connection states and controls for smart devices.
- **System Logs** – Tracks user commands, responses, and system diagnostics.

### 4.2 Data Dictionary

| Entity         | Description                                       |
|---------------|-------------------------------------------------|
| **UserProfile**  | Stores user details and preferences.            |
| **IoTDevice**   | Represents an IoT device and its current state. |
| **CommandLog**  | Stores user-issued commands and system responses. |

---

## 5. Component Design
Each module follows an object-oriented design with clearly defined interfaces. The **IoT Integration Module** communicates with smart devices, while the **AI Module** handles personalization.

---

## 6. Human Interface Design

### 6.1 Overview of User Interface
- **Interactive Display**: A sleek, responsive interface providing personalized insights.
- **Voice & Gesture Control**: Supports hands-free interactions.
- **Smart Home Control Panel**: Displays IoT device statuses and controls.

### 6.2 Screen Images
Illustrations of the UI layout will be provided in later iterations.

### 6.3 Screen Objects and Actions
- **Weather Widget** – Displays real-time weather.
- **News Feed** – Provides news updates.
- **Smart Home Panel** – Controls connected devices.
- **Personal Dashboard** – Shows calendar events and AI recommendations.

---

## 7. Requirements Matrix
This matrix ensures traceability between requirements and implemented features.

| Requirement ID | Description | System Component |
|---------------|-------------|-----------------|
| FR1 | Process user commands | Smart Mirror Processing Module |
| FR2 | Display real-time updates | User Interface Module |
| FR3 | Recognize user via facial recognition | AI Personalization Module |
| FR4 | Control smart home devices | IoT Integration Module |
| FR5 | Provide AI-based recommendations | AI Personalization Module |
| FR6 | Log system activities | System Logging Module |

