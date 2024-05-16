from flask import Flask, request, jsonify
import torch
from torchvision import transforms
from PIL import Image
import os
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models

class MNISTClissifier(nn.Module):
    def __init__(self):
        super(MNISTClissifier, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3)
        self.conv2 = nn.Conv2d(32, 64, 3)
        self.maxPool = nn.MaxPool2d(2,2)
        self.fc1 = nn.Linear(64* 12*12, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = F.relu(self.conv2(x))
        x = self.maxPool(x)
        x = x.view(-1, 64 * 12 * 12)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

app = Flask(__name__)

# Load the trained PyTorch model
state_dict = torch.load(os.path.dirname(os.path.realpath(__file__)) + '/mnist_cnn_net.pth', map_location=torch.device('cpu'))
model = MNISTClissifier()
model.load_state_dict(state_dict)
model.eval()
# Define the transformation to preprocess images
transform = transforms.Compose([
    transforms.Grayscale(),
    transforms.Resize((28, 28)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))

])

# Endpoint to receive images and make predictions
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image found'}), 400
    
    image_file = request.files['image']
    image = Image.open(image_file).convert('RGB')
    image = transform(image).unsqueeze(0)
    
    with torch.no_grad():
        output = model(image)
        _, predicted = torch.max(output, 1)
    
    return jsonify({'prediction': predicted.item()}), 200

if __name__ == '__main__':
    app.run(debug=True , host='0.0.0.0')
