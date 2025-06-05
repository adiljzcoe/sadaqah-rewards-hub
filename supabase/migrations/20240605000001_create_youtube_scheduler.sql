
-- Create YouTube channels table
CREATE TABLE youtube_channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_name TEXT NOT NULL,
    channel_id TEXT NOT NULL,
    channel_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create video queue table
CREATE TABLE video_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id UUID REFERENCES youtube_channels(id) ON DELETE CASCADE,
    video_title TEXT,
    video_id TEXT NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration_seconds INTEGER,
    scheduled_start TIMESTAMPTZ,
    scheduled_end TIMESTAMPTZ,
    is_playing BOOLEAN DEFAULT false,
    play_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create athan schedule table
CREATE TABLE athan_schedule (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prayer_name TEXT NOT NULL,
    prayer_time TIME NOT NULL,
    audio_url TEXT,
    duration_seconds INTEGER DEFAULT 300,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default athan schedule
INSERT INTO athan_schedule (prayer_name, prayer_time, duration_seconds) VALUES
('Fajr', '05:30:00', 300),
('Dhuhr', '12:15:00', 300),
('Asr', '15:30:00', 300),
('Maghrib', '18:45:00', 300),
('Isha', '20:00:00', 300);

-- Create function to get next video in queue
CREATE OR REPLACE FUNCTION get_next_video()
RETURNS TABLE (
    video_id TEXT,
    video_url TEXT,
    video_title TEXT,
    channel_name TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        vq.video_id,
        vq.video_url,
        vq.video_title,
        yc.channel_name
    FROM video_queue vq
    JOIN youtube_channels yc ON vq.channel_id = yc.id
    WHERE yc.is_active = true
    ORDER BY vq.play_order ASC, vq.created_at ASC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Create function to check if athan time is now
CREATE OR REPLACE FUNCTION is_athan_time()
RETURNS TABLE (
    prayer_name TEXT,
    audio_url TEXT,
    duration_seconds INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ath.prayer_name,
        ath.audio_url,
        ath.duration_seconds
    FROM athan_schedule ath
    WHERE ath.is_active = true
    AND ABS(EXTRACT(EPOCH FROM (CURRENT_TIME - ath.prayer_time))) < 30
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;
