// D:\Dev\habit-tracker\habit-tracker-v1\src\app\components\HabitCreationUI.tsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  Radio,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // For time picker icon

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
  // HabitCreationUIは関数でコンポーネント
  // ステート変数、useStateはフック（Reactの機能）
  const [openHabitTypeSelection, setOpenHabitTypeSelection] = useState(false);
  const [openYesNoHabitCreation, setOpenYesNoHabitCreation] = useState(false);
  const [habitName, setHabitName] = useState(""); // habitName：状態変数、setHabitName：状態変数を更新するための関数、 ("")：初期値
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
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [notes, setNotes] = useState("");

  // リマインダー時刻を見やすい文字列に整える関数
  const formatReminderTime = () => {
    const displayHour = reminderHour;
    const displayMinute = reminderMinute.toString().padStart(2, "0"); // 1ケタで入力されたら、十の位に0を足して2ケタに直す
    return `${displayHour}:${displayMinute} ${reminderPeriod}`; // "7:00 AM"
  };

  // 習慣データをまとめて出力するロジック
  const handleCreateHabit = () => {
    console.log("習慣データ:", {
      habitName, // オブジェクトの省略記法（キーと値の変数名）
      habitQuestion,
      selectedColor,
      frequency: {
        type: frequencyType, // frequencyTypeは変数名
        days:
          frequencyType === "custom" || //論理演算子の||で、orの意味
          frequencyType === "weekly" ||
          frequencyType === "monthly"
            ? customFrequencyDays // ？は三項演算子で、真のときcustomFrequencyDaysになる
            : undefined,
        times: frequencyType === "custom" ? customFrequencyTimes : undefined, //　何回か、回数を登録する
      },
      reminder: reminderEnabled
        ? {
            hour: reminderHour,
            minute: reminderMinute,
            period: reminderPeriod,
            displayTime: formatReminderTime(),
          }
        : null,
      notes,
    });
    setOpenYesNoHabitCreation(false); // YesNoの習慣作成画面を閉じる

    // 入力フィールドをリセット (オプション)
    setHabitName("");
    setHabitQuestion("");
    setSelectedColor("#BBDEFB");
    setFrequencyType("daily");
    setCustomFrequencyDays(1);
    setCustomFrequencyTimes(1);
    setReminderEnable(false);
    setReminderMinute(0);
    setReminderPeriod("AM");
    setNotes("");
  };

  // 時刻ピッカーのクリア
  const handleClearTime = () => {
    setReminderHour(12);
    setReminderMinute(0);
    setReminderPeriod("AM");
    setOpenTimePicker(false);
  };

  return (
    <Box className="flex flex-col h-screen bg-gray-100 font-inter">
      {/* ヘッダー */}
      <Box className="flex justify-between items-center p-4 bg-white shadow-md rounded-b-lg">
        {/* BoxはMUIのレイアウト用コンポーネント（ほぼ<div>と一緒） */}
        <Typography variant="h6" className="text-gray-800">
          習慣
        </Typography>
        <IconButton
          color="primary"
          onClick={() => setOpenHabitTypeSelection(true)}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* 習慣タイプ選択ダイアログ */}
      <Dialog
        open={openHabitTypeSelection}
        onClose={() => setOpenHabitTypeSelection(false)}
        PaperProps={{ className: "rounded-lg" }}
      >
        <DialogTitle className="text-center font-bold text-lg">
          習慣のタイプを選択
        </DialogTitle>
        <DialogContent className="flex flex-col gap-4 p-6">
          <Button
            variant="contained"
            fullWidth
            className="py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => {
              setOpenYesNoHabitCreation(true);
              setOpenHabitTypeSelection(false);
            }}
          >
            はい/いいえ
          </Button>
          <Button
            variant="outlined"
            fullWidth
            className="py-3 rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-all duration-200"
          >
            計測可能
          </Button>
        </DialogContent>
        <DialogActions className="p-4">
          <Button
            onClick={() => setOpenHabitTypeSelection(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>

      {/* はい/いいえ習慣作成ダイアログ */}
      <Dialog
        open={openYesNoHabitCreation}
        onClose={() => setOpenYesNoHabitCreation(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ className: "rounded-lg" }}
      >
        <DialogTitle className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-t-lg">
          <Typography variant="h6" component="div" className="font-bold">
            習慣を作成
          </Typography>
          <Button
            variant="contained"
            endIcon={<SaveIcon />}
            onClick={handleCreateHabit}
            className="bg-white text-blue-500 hover:bg-gray-100 rounded-lg shadow-md"
          >
            保存
          </Button>
        </DialogTitle>
        <DialogContent className="p-6 space-y-6">
          {/* 名前 */}
          <TextField
            label="名前"
            placeholder="例: エクササイズ"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            className="rounded-lg"
            InputLabelProps={{ shrink: true }}
          />

          {/* 色 */}
          <Box className="flex items-center space-x-4">
            <Typography
              variant="subtitle1"
              className="min-w-[60px] font-medium text-gray-700"
            >
              色
            </Typography>
            <IconButton
              onClick={() => setOpenColorPicker(true)}
              className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: selectedColor }}
            ></IconButton>

            <Dialog
              open={openColorPicker}
              onClose={() => setOpenColorPicker(false)}
              PaperProps={{ className: "rounded-lg" }}
            >
              <DialogTitle className="text-center font-bold text-lg">
                色を選択
              </DialogTitle>
              <DialogContent className="p-4">
                <Grid container spacing={1}>
                  {colors.map((color, index) => (
                    <Grid
                      item
                      xs={2}
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          setSelectedColor(color);
                          setOpenColorPicker(false);
                        }}
                        style={{ backgroundColor: color }}
                        className="w-10 h-10 rounded-full shadow-sm transition-all duration-200 hover:scale-110"
                      >
                        {selectedColor === color && (
                          <CheckIcon fontSize="small" className="text-white" />
                        )}
                      </IconButton>
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>
            </Dialog>
          </Box>

          {/* 質問 */}
          <TextField
            label="質問"
            placeholder="例: 今日エクササイズをしましたか？"
            value={habitQuestion}
            onChange={(e) => setHabitQuestion(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            className="rounded-lg"
            InputLabelProps={{ shrink: true }}
          />

          {/* 頻度 */}
          <Box className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <Typography
              variant="subtitle1"
              className="mb-3 font-bold text-gray-700"
            >
              頻度
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                row
                aria-label="frequency"
                name="frequency-type"
                value={frequencyType}
                onChange={(e) => setFrequencyType(e.target.value)}
                className="justify-around"
              >
                <FormControlLabel
                  value="daily"
                  control={<Radio />}
                  label="毎日"
                />
                <FormControlLabel
                  value="weekly"
                  control={<Radio />}
                  label="毎週"
                />
                <FormControlLabel
                  value="monthly"
                  control={<Radio />}
                  label="毎月"
                />
                <FormControlLabel
                  value="custom"
                  control={<Radio />}
                  label="カスタム"
                />
              </RadioGroup>
            </FormControl>

            {frequencyType === "custom" && (
              <Box className="flex items-center justify-center space-x-3 mt-4 p-2 bg-gray-50 rounded-md">
                <TextField
                  label="回数"
                  type="number"
                  value={customFrequencyTimes}
                  onChange={(e) =>
                    setCustomFrequencyTimes(parseInt(e.target.value) || 1)
                  }
                  inputProps={{ min: 1 }}
                  sx={{ width: "80px" }}
                  variant="outlined"
                  size="small"
                  className="rounded-md"
                />
                <Typography className="text-gray-700">回 /</Typography>
                <TextField
                  label="日数"
                  type="number"
                  value={customFrequencyDays}
                  onChange={(e) =>
                    setCustomFrequencyDays(parseInt(e.target.value) || 1)
                  }
                  inputProps={{ min: 1 }}
                  sx={{ width: "80px" }}
                  variant="outlined"
                  size="small"
                  className="rounded-md"
                />
                <Typography className="text-gray-700">日間</Typography>
              </Box>
            )}
          </Box>

          {/* リマインダー */}
          <Box className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm">
            <FormControlLabel
              control={
                <Switch
                  checked={reminderEnabled}
                  onChange={(e) => setReminderEnable(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography className="font-bold text-gray-700">
                  リマインダー
                </Typography>
              }
            />
            {reminderEnabled && (
              <Button
                onClick={() => setOpenTimePicker(true)}
                variant="outlined"
                startIcon={<AccessTimeIcon />}
                className="rounded-lg px-4 py-2 text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                {formatReminderTime()}
              </Button>
            )}
            <Dialog
              open={openTimePicker}
              onClose={() => setOpenTimePicker(false)}
              PaperProps={{ className: "rounded-lg" }}
            >
              <DialogTitle className="text-center font-bold text-lg">
                時刻を選択
              </DialogTitle>
              <DialogContent className="p-6 flex flex-col items-center">
                {/* 時計のイラストのプレースホルダー */}
                <Box className="relative w-48 h-48 mb-6 flex items-center justify-center">
                  <img
                    src="https://placehold.co/150x150/E0F2F7/000000?text=Clock"
                    alt="Clock UI"
                    className="w-full h-full rounded-full border-4 border-blue-200"
                  />
                  <Typography
                    variant="h4"
                    className="absolute font-bold text-blue-800"
                  >
                    {formatReminderTime()}
                  </Typography>
                </Box>
                <Box className="flex space-x-4 mb-6">
                  <Select
                    value={reminderHour}
                    onChange={(e) => setReminderHour(parseInt(e.target.value))}
                    className="w-24 rounded-md"
                    size="small"
                  >
                    {[...Array(12).keys()].map((i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    value={reminderMinute}
                    onChange={(e) =>
                      setReminderMinute(parseInt(e.target.value))
                    }
                    className="w-24 rounded-md"
                    size="small"
                  >
                    {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
                      <MenuItem key={m} value={m}>
                        {m.toString().padStart(2, "0")}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    value={reminderPeriod}
                    onChange={(e) => setReminderPeriod(e.target.value)}
                    className="w-24 rounded-md"
                    size="small"
                  >
                    <MenuItem value="AM">AM</MenuItem>
                    <MenuItem value="PM">PM</MenuItem>
                  </Select>
                </Box>
              </DialogContent>
              <DialogActions className="p-4">
                <Button
                  onClick={handleClearTime}
                  className="text-gray-600 hover:text-gray-800"
                >
                  クリア
                </Button>
                <Button
                  onClick={() => setOpenTimePicker(false)}
                  variant="contained"
                  className="bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md"
                >
                  完了
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          {/* メモ */}
          <TextField
            label="メモ"
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            className="rounded-lg"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default HabitCreationUI;
