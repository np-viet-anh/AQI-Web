# pyrefly: ignore [missing-import]
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/api/aqi', methods=['GET'])
def get_aqi():
    lat = request.args.get('lat', '10.78') # Default: HCMC
    lon = request.args.get('lon', '106.70')
    
    try:
        # Fetch Air Quality data from Open-Meteo
        # past_days=2 to get yesterday and today's hourly data, forecast_days=1 to get today's remaining
        aqi_url = f"https://air-quality-api.open-meteo.com/v1/air-quality?latitude={lat}&longitude={lon}&hourly=pm10,pm2_5,us_aqi&timezone=auto&past_days=2&forecast_days=2"
        
        aqi_resp = requests.get(aqi_url)
        aqi_data = aqi_resp.json()
        
        if 'hourly' not in aqi_data:
            return jsonify({"error": "Failed to fetch AQI data"}), 500
            
        hourly = aqi_data['hourly']
        times = hourly['time']
        aqi_values = hourly['us_aqi']
        pm25_values = hourly['pm2_5']
        pm10_values = hourly['pm10']
        
        # We want to return hourly data. Let's return the last 24 hours up to the current time, and maybe next 12 hours forecast
        current_dt = datetime.now()
        # Round current time down to the hour
        current_hour = current_dt.replace(minute=0, second=0, microsecond=0)
        
        hourly_data = []
        for i, t in enumerate(times):
            if aqi_values[i] is not None:
                date_obj = datetime.strptime(t, "%Y-%m-%dT%H:%M")
                
                # Check if this date_obj is within [-5 hours, +5 hours] of current_hour
                diff_hours = (date_obj - current_hour).total_seconds() / 3600
                
                if -5 <= diff_hours <= 5:
                    label_suffix = ""
                    if diff_hours == 0:
                        label_suffix = " (Hiện tại)"
                    elif diff_hours > 0:
                        label_suffix = " (Dự báo)"
                        
                    hourly_data.append({
                        "time": date_obj.strftime("%H:00") + label_suffix,
                        "raw_time": t,
                        "aqi": round(aqi_values[i]),
                        "pm25": round(pm25_values[i], 1),
                        "pm10": round(pm10_values[i], 1)
                    })
        
        return jsonify(hourly_data)
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
