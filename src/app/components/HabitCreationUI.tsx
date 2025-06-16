import React, { useState, useEffect, use } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  Dialog,
  DialogAction,
  DialogContent,
  DialogTitle,
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icon-material/Add";
import SaveIcon from "@mui/icon-material/Save";
import CheckIcon from "@mui/icon-material/Check";
import CloseIcon from "@mui/icon-material/Close";
import AccessTimeIcon from "@mui/icon-material/AccessTime"; // For time picker icon
import { useSearchParams } from "next/navigation";

// カラーパレットの定義（４＊５グリッド）
const colors = [
  "#FFCDD2",
  "#F8BBD0",
  "#E1BEE7",
  "#D1C4E9",
  "#C5CAE9", // Row 1
  "#BBDEFB",
  "#B3E5FC",
  "#B2EBF2",
  "#B2DFDB",
  "#C8E6C9", // Row 2
  "#DCEDC8",
  "#F0F4C3",
  "#FFF9C4",
  "#FFECB3",
  "#FFE0B2", // Row 3
  "#FFCCBC",
  "#D7CCC8",
  "#F5F5F5",
  "#CFD8DC",
  "#B0BEC5", // Row 4
];

function HabitCreationUI() {
  // ステート変数
  const [openHabitTypeSelection, setOpenHabitTypeSelection] = useState(false);
  const [openYesNoHabitCreation, setOpenYesNoHabitCreation] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habitQuestion, setHabitQuestion] = useState("");
  const [selectedColor, setSelectedColor] = useState("#BBDEFB"); // デフォルトの色
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [frequencyType, setFrequencyType] = useState("daily"); // daily, weekly, monthly, custom
  const [customFrequencyDays, setCustomFrequencyDays] = useState(1);
  const [customFrequencyTimes, setCustomFrequencyTimes] = useState(1);
  const [reminderEnabled, setReminderEnable] = useState(false);
  const [reminderHour, setReminderHour] = useState(12);
  const [reminderMinute, setReminderMinute] = useState(12);
  const [reminderPeriod, setReminderPeriod] = useState("AM"); // AM or PM
  const [openTimerPicker, setOpenTimePicker] = useState(false);
  const [notes, setNotes] = useState("");
}

// リマインダー時刻のフォーマット
