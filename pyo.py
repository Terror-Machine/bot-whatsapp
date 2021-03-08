from pydub import AudioSegment
path = 'database/datab.ogg'
path2 = 'database/pepek.mp3'
rate = 75000
sound = AudioSegment.from_file(path, format="ogg")
octaves = 0.2
new_sample_rate = rate if rate else int(sound.frame_rate * (2.0 ** octaves))
hipitch_sound = sound._spawn(sound.raw_data, overrides={'frame_rate': new_sample_rate})
hipitch_sound = hipitch_sound.set_frame_rate(44100)
hipitch_sound.export(path2, format="mp3")