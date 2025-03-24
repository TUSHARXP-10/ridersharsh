<?php
use PHPUnit\Framework\TestCase;

class RidesTest extends TestCase
{
    private $app;
    private $database;

    protected function setUp(): void
    {
        // Initialize Slim app and Firebase database for testing
        $this->app = require __DIR__ . '/../src/index.php';
        $factory = (new \Kreait\Firebase\Factory)
            ->withServiceAccount(__DIR__ . '/../firebase-credentials.json');
        $this->database = $factory->createDatabase();
    }

    public function testCreateRide()
    {
        $testData = [
            'userId' => 'test-user-123',
            'rideData' => [
                'startLocation' => 'Test Start',
                'endLocation' => 'Test End',
                'date' => '2024-01-20',
                'time' => '14:00'
            ]
        ];

        $response = $this->createRequest('POST', '/api/rides/create', $testData);
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($responseData['success']);
        $this->assertNotEmpty($responseData['rideId']);

        // Cleanup test data
        $this->database->getReference('rides/' . $responseData['rideId'])->remove();
    }

    public function testGetUserRides()
    {
        // Create a test ride first
        $userId = 'test-user-456';
        $testRide = [
            'userId' => $userId,
            'startLocation' => 'Test Location',
            'endLocation' => 'Test Destination',
            'status' => 'active',
            'createdAt' => date('c')
        ];
        
        $rideRef = $this->database->getReference('rides')->push($testRide);
        $rideId = $rideRef->getKey();

        $response = $this->createRequest('GET', "/api/rides/user/{$userId}");
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($responseData['success']);
        $this->assertIsArray($responseData['rides']);
        $this->assertNotEmpty($responseData['rides']);

        // Cleanup
        $this->database->getReference('rides/' . $rideId)->remove();
    }

    public function testUpdateRideStatus()
    {
        // Create a test ride
        $testRide = [
            'userId' => 'test-user-789',
            'status' => 'active',
            'createdAt' => date('c')
        ];
        
        $rideRef = $this->database->getReference('rides')->push($testRide);
        $rideId = $rideRef->getKey();

        $updateData = ['status' => 'completed'];
        $response = $this->createRequest('PUT', "/api/rides/{$rideId}/status", $updateData);
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($responseData['success']);

        // Verify the update
        $updatedRide = $this->database->getReference('rides/' . $rideId)->getValue();
        $this->assertEquals('completed', $updatedRide['status']);

        // Cleanup
        $this->database->getReference('rides/' . $rideId)->remove();
    }

    public function testCreateRideValidation()
    {
        $invalidData = [
            'userId' => '',  // Empty user ID
            'rideData' => []
        ];

        $response = $this->createRequest('POST', '/api/rides/create', $invalidData);
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(400, $response->getStatusCode());
        $this->assertFalse($responseData['success']);
    }

    private function createRequest(string $method, string $path, array $data = [])
    {
        $request = $this->createRequest($method, $path)
            ->withHeader('Content-Type', 'application/json');

        if (!empty($data)) {
            $request->getBody()->write(json_encode($data));
        }

        return $this->app->handle($request);
    }
}